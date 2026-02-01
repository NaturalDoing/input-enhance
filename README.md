# 输入增强
[![在线演示](https://img.shields.io/badge/在线演示-点击查看-blue?style=for-the-badge&logo=github)](https://naturaldoing.github.io/input-enhance/)

<details>
<summary>📱 点击查看网页预览</summary>

🔗 [打开完整页面]([https://你的网页地址](https://naturaldoing.github.io/input-enhance/))

</details>

<details>
<summary>📱 点击查看网页预览</summary>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>键盘模拟</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <div class="container">
        <button class="theme-toggle" id="themeToggle" aria-label="切换深色模式">
            <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </button>
        <div class="keyboard" id="keyboard">
            <div class="keyboard-row" data-row="-1">
                <div class="key" data-key="`">`</div>
                <div class="key" data-key="1">1</div>
                <div class="key" data-key="2">2</div>
                <div class="key" data-key="3">3</div>
                <div class="key" data-key="4">4</div>
                <div class="key" data-key="5">5</div>
                <div class="key" data-key="6">6</div>
                <div class="key" data-key="7">7</div>
                <div class="key" data-key="8">8</div>
                <div class="key" data-key="9">9</div>
                <div class="key" data-key="0">0</div>
                <div class="key" data-key="-">-</div>
                <div class="key" data-key="=">=</div>
                <div class="key key-special key-backspace" data-key="Backspace" tabindex="0">Backspace</div>
            </div>
            <div class="keyboard-row" data-row="0">
                <div class="key key-special key-tab" data-key="Tab" tabindex="0">
                    <span class="key-label">Tab</span>
                    <span class="key-alt-label" style="display:none;">Alt</span>
                </div>
                <div class="key" data-key="q">Q</div>
                <div class="key" data-key="w">W</div>
                <div class="key" data-key="e">E</div>
                <div class="key" data-key="r">R</div>
                <div class="key" data-key="t">T</div>
                <div class="key" data-key="y">Y</div>
                <div class="key" data-key="u">U</div>
                <div class="key" data-key="i">I</div>
                <div class="key" data-key="o">O</div>
                <div class="key" data-key="p">P</div>
                <div class="key key-bracket" data-key="[">[</div>
                <div class="key key-bracket" data-key="]">]</div>
                <div class="key key-backslash" data-key="\">\</div>
            </div>
            <div class="keyboard-row" data-row="1">
                <div class="key key-special key-capslock" data-key="CapsLock" tabindex="0">
                    <div class="capslock-combo">
                        <span class="combo-item combo-ctrl">Ctrl</span>
                        <span class="combo-item combo-esc">Esc</span>
                    </div>
                    <span class="capslock-label" style="display:none;">CapsLock</span>
                </div>
                <div class="key" data-key="a">A</div>
                <div class="key" data-key="s">S</div>
                <div class="key" data-key="d">D</div>
                <div class="key" data-key="f">F</div>
                <div class="key" data-key="g">G</div>
                <div class="key" data-key="h">H</div>
                <div class="key" data-key="j">J</div>
                <div class="key" data-key="k">K</div>
                <div class="key" data-key="l">L</div>
                <div class="key" data-key=";" tabindex="0">
                    <span class="key-label">;</span>
                    <span class="key-alt-label" style="display:none;">End</span>
                </div>
                <div class="key key-quote" data-key="'">'</div>
                <div class="key key-special key-enter" data-key="Enter" tabindex="0">Enter</div>
            </div>
            <div class="keyboard-row" data-row="2">
                <div class="key key-special key-shift" data-key="Shift" tabindex="0">Shift</div>
                <div class="key" data-key="z">Z</div>
                <div class="key" data-key="x">X</div>
                <div class="key" data-key="c">C</div>
                <div class="key" data-key="v">V</div>
                <div class="key" data-key="b">B</div>
                <div class="key" data-key="n">N</div>
                <div class="key" data-key="m">M</div>
                <div class="key key-comma" data-key=",">,</div>
                <div class="key key-period" data-key=".">.</div>
                <div class="key key-slash" data-key="/">/</div>
                <div class="key key-special key-shift-right" data-key="ShiftR" tabindex="0">Shift</div>
            </div>
            <div class="keyboard-row" data-row="3">
                <div class="key key-special key-ctrl" data-key="Ctrl" tabindex="0">Ctrl</div>
                <div class="key key-special key-win" data-key="Win" tabindex="0">Win</div>
                <div class="key key-special key-alt" data-key="Alt" tabindex="0">Alt</div>
                <div class="key key-space" data-key=" " tabindex="0">
                    <span class="key-label"> </span>
                </div>
                <div class="key key-special key-alt-right" data-key="AltR" tabindex="0">Alt</div>
                <div class="key key-special key-appskey" data-key="AppsKey" tabindex="0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="9" x2="15" y2="9"></line>
                        <line x1="9" y1="12" x2="15" y2="12"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                </div>
                <div class="key key-special key-ctrl-right" data-key="CtrlR" tabindex="0">Ctrl</div>
            </div>
        </div>
    </div>
    <script src="./script.js"></script>
</body>
</html>


</details>

一个基于 AutoHotkey v2.0 的键盘输入增强工具，让你的键盘使用更加高效便捷。

## 功能特性

### 1. CapsLock 键增强
- **`Win + CapsLock`**：切换大小写
- **单击 CapsLock**：相当于按 `Esc` 键
- **CapsLock + 其他键**：相当于 `Ctrl + 其他键`（实现组合键功能）

### 2. 编辑模式
- **`; + j`**：进入编辑模式
- **`o`**：退出编辑模式
- **在编辑模式中**：
  - `i j k l` → `↑ ← ↓ →`（方向键）
  - `h ;` → `Home End`（行首行尾）
  - `m` → `AppsKey`（右键菜单键）
  - `Tab` → `Alt`（Alt 键）

### 3. Tab 键增强
- **单击 Tab**：保持原有 Tab 键功能
- **`Tab + m`**：相当于右键菜单键
- **`Tab + i j k l`** → `↑ ← ↓ →`（方向键）
- **`Tab + h`** → `Home`（行首）
- **`Tab + ;`** → `End`（行尾）

### 4. 中文输入增强
在中文输入法状态下，**双击**以下符号键可快速输入英文符号：
- 常规符号：` ; . / ! $ ^ ) _ } : > ? `
- 成对符号：`( { " < ` `（输入法需要开启“自动补全成对符号”功能）

#### 三击特殊功能
- ` 键三击：输出代码块格式符号（```...```）
- `[` 键三击：输出 `[[]]`
- `]` 键三击：输出 `]]`

## 使用方法

1. 直接双击运行打包好的 `输入增强.exe` 程序
2. 程序会在后台自动运行，提供上述增强功能
