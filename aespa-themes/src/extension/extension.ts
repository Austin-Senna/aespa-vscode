/**
 * Runtime: a status bar item and commands that apply an era's color theme
 * and icon theme together, plus optional icon sync when the color theme changes.
 */
import * as vscode from "vscode";
import { ERA_THEMES, eraForColorTheme, randomEra, stepEra, type EraThemeIds } from "./eras.js";

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

async function syncIconsToColorTheme(): Promise<void> {
  if (!config().get<boolean>("aespa.syncIconTheme", true)) {
    return;
  }
  const era = eraForColorTheme(currentColorTheme());
  if (era && currentIconTheme() !== era.iconTheme) {
    await config().update(ICON_THEME, era.iconTheme, vscode.ConfigurationTarget.Global);
  }
}

async function chooseEra(): Promise<void> {
  const current = currentColorTheme();
  const items = ERA_THEMES.map((era) => ({
    label: `${era.colorTheme === current ? "$(check) " : ""}${era.label}`,
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
        await syncIconsToColorTheme();
      }
      if (e.affectsConfiguration(COLOR_THEME) || e.affectsConfiguration("aespa.statusBar")) {
        refreshStatus();
      }
    }),
  );

  refreshStatus();
  // An era color theme always brings its icons along (unless aespa.syncIconTheme is off).
  void syncIconsToColorTheme();
}

export function deactivate(): void {}
