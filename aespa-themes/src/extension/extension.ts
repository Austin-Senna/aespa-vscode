/**
 * Runtime: a status bar item and commands that apply an era's color theme
 * and icon theme together, plus optional two-way sync when either one changes.
 */
import * as vscode from "vscode";
import { ERA_THEMES, eraForColorTheme, randomEra, repairedColorTheme, stepEra, syncTarget, type EraThemeIds, type ThemeSetting } from "./eras.js";

const COLOR_THEME = "workbench.colorTheme";
const ICON_THEME = "workbench.iconTheme";

function config(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration();
}

function currentColorTheme(): string | undefined {
  return config().get<string>(COLOR_THEME);
}

function currentIconTheme(): string | undefined {
  return config().get<string>(ICON_THEME);
}

async function applyEra(era: EraThemeIds): Promise<void> {
  await config().update(COLOR_THEME, era.colorTheme, vscode.ConfigurationTarget.Global);
  await config().update(ICON_THEME, era.iconTheme, vscode.ConfigurationTarget.Global);
}

/**
 * Earlier versions wrote an era's label into `workbench.colorTheme`. VS Code
 * matches that setting by id, so the label left the default theme showing.
 * Rewrite it to the id. Returns true when it wrote, since that write fires
 * another configuration change that does the rest.
 */
async function repairColorTheme(): Promise<boolean> {
  const id = repairedColorTheme(currentColorTheme());
  if (!id) {
    return false;
  }
  await config().update(COLOR_THEME, id, vscode.ConfigurationTarget.Global);
  return true;
}

/** Bring the other theme setting in line after `changed` moved to or from an era. */
async function syncThemes(changed: ThemeSetting): Promise<void> {
  if (!config().get<boolean>("aespa.syncIconTheme", true)) {
    return;
  }
  const target = syncTarget(changed, currentColorTheme(), currentIconTheme());
  if (target) {
    await config().update(target.setting === "color" ? COLOR_THEME : ICON_THEME, target.value, vscode.ConfigurationTarget.Global);
  }
}

async function chooseEra(): Promise<void> {
  const current = eraForColorTheme(currentColorTheme());
  const items = ERA_THEMES.map((era) => ({
    label: `${era === current ? "$(check) " : ""}${era.label}`,
    description: `${era.year} · ${era.type}`,
    era,
  }));
  const picked = await vscode.window.showQuickPick(items, {
    placeHolder: "Pick an aespa era (sets color theme and icon theme)",
    matchOnDescription: true,
  });
  if (picked) {
    await applyEra(picked.era);
  }
}

export function activate(context: vscode.ExtensionContext): void {
  const status = vscode.window.createStatusBarItem("aespa.era", vscode.StatusBarAlignment.Right, 10);
  status.name = "aespa era";
  status.command = "aespa.chooseEra";

  const refreshStatus = () => {
    if (!config().get<boolean>("aespa.statusBar", true)) {
      status.hide();
      return;
    }
    const era = eraForColorTheme(currentColorTheme());
    status.text = era ? `æ ${era.label.replace(/^aespa · /, "")}` : "æ aespa";
    status.tooltip = era ? `${era.label} (${era.year}). Click to switch era.` : "Pick an aespa era";
    status.show();
  };

  context.subscriptions.push(
    status,
    vscode.commands.registerCommand("aespa.chooseEra", chooseEra),
    vscode.commands.registerCommand("aespa.nextEra", () => applyEra(stepEra(currentColorTheme(), 1))),
    vscode.commands.registerCommand("aespa.previousEra", () => applyEra(stepEra(currentColorTheme(), -1))),
    vscode.commands.registerCommand("aespa.randomEra", () => applyEra(randomEra(currentColorTheme()))),
    vscode.commands.registerCommand("aespa.syncIcons", async () => {
      const era = eraForColorTheme(currentColorTheme());
      if (!era) {
        void vscode.window.showInformationMessage("The active color theme is not an aespa era.");
        return;
      }
      await config().update(ICON_THEME, era.iconTheme, vscode.ConfigurationTarget.Global);
    }),
    vscode.workspace.onDidChangeConfiguration(async (e) => {
      if (e.affectsConfiguration(COLOR_THEME)) {
        if (!(await repairColorTheme())) {
          await syncThemes("color");
        }
      } else if (e.affectsConfiguration(ICON_THEME)) {
        await syncThemes("icon");
      }
      if (e.affectsConfiguration(COLOR_THEME) || e.affectsConfiguration("aespa.statusBar")) {
        refreshStatus();
      }
    }),
  );

  refreshStatus();
  // Fix a label left by an earlier version; otherwise an era color theme brings
  // its icons along (unless aespa.syncIconTheme is off).
  void repairColorTheme().then((wrote) => (wrote ? undefined : syncThemes("color")));
}

export function deactivate(): void {}
