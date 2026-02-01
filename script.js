// 键盘状态管理
const KeyboardState = {
    isTabPressed: false,
    isSemicolonPressed: false,
    isEditMode: false,
    isWinPressed: false,
    isDarkMode: false
};

// DOM 元素
const themeToggle = document.getElementById('themeToggle');
const keyboard = document.getElementById('keyboard');

// 初始化
function init() {
    loadThemePreference();
    bindEvents();
    updateKeyboardDisplay();
}

// 绑定事件
function bindEvents() {
    // 主题切换
    themeToggle.addEventListener('click', toggleTheme);

    // 键盘点击事件
    keyboard.addEventListener('click', handleKeyClick);
}

// 处理按键点击
function handleKeyClick(e) {
    const key = e.target.closest('.key');
    if (!key) return;

    const keyValue = key.dataset.key;

    switch (keyValue) {
        case 'Tab':
            // 在编辑模式下，Tab 键不执行任何操作（只显示为 Alt）
            if (KeyboardState.isEditMode) {
                return;
            }
            toggleTabMode();
            break;
        case ';':
            // 在编辑模式下，分号键不执行任何操作
            if (KeyboardState.isEditMode) {
                return;
            }
            // 在 Tab 模式下，不能切换分号模式
            if (KeyboardState.isTabPressed) {
                return;
            }
            toggleSemicolonMode();
            break;
        case 'Win':
            toggleWinMode();
            break;
        case 'j':
            // 在分号模式下点击 j 键进入编辑模式
            if (KeyboardState.isSemicolonPressed && !KeyboardState.isEditMode) {
                enterEditMode();
            }
            break;
        case 'o':
            if (KeyboardState.isEditMode) {
                exitEditMode();
            }
            break;
    }
}

// 切换 Tab 模式
function toggleTabMode() {
    // 如果在编辑模式、分号模式或 Win 模式，不能进入 Tab 模式
    if (KeyboardState.isEditMode || KeyboardState.isSemicolonPressed || KeyboardState.isWinPressed) {
        return;
    }
    KeyboardState.isTabPressed = !KeyboardState.isTabPressed;
    updateKeyboardDisplay();
}

// 切换分号模式
function toggleSemicolonMode() {
    // 如果在编辑模式、Tab 模式或 Win 模式，不能进入分号模式
    if (KeyboardState.isEditMode || KeyboardState.isTabPressed || KeyboardState.isWinPressed) {
        return;
    }
    KeyboardState.isSemicolonPressed = !KeyboardState.isSemicolonPressed;
    updateKeyboardDisplay();
}

// 进入编辑模式
function enterEditMode() {
    // Win 模式下不能进入编辑模式
    if (KeyboardState.isWinPressed) {
        return;
    }
    KeyboardState.isEditMode = true;
    KeyboardState.isSemicolonPressed = false;
    KeyboardState.isTabPressed = false;
    updateKeyboardDisplay();
}

// 退出编辑模式
function exitEditMode() {
    KeyboardState.isEditMode = false;
    updateKeyboardDisplay();
}

// 切换 Win 模式
function toggleWinMode() {
    // Win 模式可以与其他模式共存，但这里只允许在普通模式下切换
    if (KeyboardState.isEditMode || KeyboardState.isTabPressed || KeyboardState.isSemicolonPressed) {
        return;
    }
    KeyboardState.isWinPressed = !KeyboardState.isWinPressed;
    updateKeyboardDisplay();
}

// 更新键盘显示
function updateKeyboardDisplay() {
    const keys = document.querySelectorAll('.key');

    keys.forEach(key => {
        const keyValue = key.dataset.key;
        resetKeyDisplay(key);

        if (KeyboardState.isEditMode) {
            applyEditModeStyles(key, keyValue);
        } else if (KeyboardState.isTabPressed) {
            applyTabModeStyles(key, keyValue);
        } else if (KeyboardState.isSemicolonPressed) {
            applySemicolonModeStyles(key, keyValue);
        } else {
            applyNormalModeStyles(key, keyValue);
        }

        if (KeyboardState.isWinPressed) {
            applyWinModeStyles(key, keyValue);
        }
    });
}

// 存储原始文本的 Map
const originalTextMap = new Map();

// 获取按键的原始文本
function getOriginalText(key, keyValue) {
    if (originalTextMap.has(keyValue)) {
        return originalTextMap.get(keyValue);
    }
    const keyLabel = key.querySelector('.key-label');
    const text = keyLabel ? keyLabel.textContent : key.textContent;
    originalTextMap.set(keyValue, text);
    return text;
}

// 重置按键显示
function resetKeyDisplay(key) {
    key.classList.remove('key-highlight', 'key-special-highlight', 'key-edit-highlight', 'key-tab-alt', 'key-capslock-highlight', 'pressed');

    // 重置标签显示
    const keyLabel = key.querySelector('.key-label');
    const keyAltLabel = key.querySelector('.key-alt-label');
    const keyValue = key.dataset.key;

    if (keyLabel) {
        keyLabel.style.display = '';
        // 恢复原始文本
        if (keyValue && originalTextMap.has(keyValue)) {
            keyLabel.textContent = originalTextMap.get(keyValue);
        }
    } else if (keyValue && originalTextMap.has(keyValue)) {
        // 对于没有 key-label 的按键，直接恢复 textContent
        key.textContent = originalTextMap.get(keyValue);
    }
    if (keyAltLabel) keyAltLabel.style.display = 'none';

    // 重置 CapsLock 显示
    const capslockCombo = key.querySelector('.capslock-combo');
    const capslockLabel = key.querySelector('.capslock-label');

    if (capslockCombo) capslockCombo.style.display = '';
    if (capslockLabel) capslockLabel.style.display = 'none';
}

// 普通模式样式
function applyNormalModeStyles(key, keyValue) {
    // Win 模式下，Tab 和分号键不显示颜色
    if (KeyboardState.isWinPressed) {
        const winSpecialKeys = ['CapsLock', 'Win'];
        if (winSpecialKeys.includes(keyValue)) {
            key.classList.add('key-special-highlight');
        }
        return;
    }
    const specialKeys = ['Tab', 'CapsLock', 'Win', ';'];
    if (specialKeys.includes(keyValue)) {
        key.classList.add('key-special-highlight');
    }
}

// 创建 AppsKey 图标 SVG
function createAppsKeyIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="9"></line>
        <line x1="9" y1="12" x2="15" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
    </svg>`;
}

// Tab 模式样式
function applyTabModeStyles(key, keyValue) {
    const arrowKeys = {
        'i': { alt: '↑', class: 'key-tab-alt' },
        'j': { alt: '←', class: 'key-tab-alt' },
        'k': { alt: '↓', class: 'key-tab-alt' },
        'l': { alt: '→', class: 'key-tab-alt' },
        'h': { alt: 'Home', class: 'key-tab-alt' },
        ';': { alt: 'End', class: 'key-tab-alt' }
    };

    if (arrowKeys[keyValue]) {
        key.classList.add(arrowKeys[keyValue].class);
        // 保存原始文本
        getOriginalText(key, keyValue);
        // 更新文本
        const keyLabel = key.querySelector('.key-label');
        if (keyLabel) {
            keyLabel.textContent = arrowKeys[keyValue].alt;
        } else {
            key.textContent = arrowKeys[keyValue].alt;
        }
    }

    // m 键显示为 AppsKey 图标
    if (keyValue === 'm') {
        key.classList.add('key-tab-alt');
        getOriginalText(key, keyValue);
        key.innerHTML = createAppsKeyIcon();
    }

    // Tab 键显示为按下状态
    if (keyValue === 'Tab') {
        key.classList.add('pressed');
    }
}

// 分号模式样式（进入编辑模式前）
function applySemicolonModeStyles(key, keyValue) {
    if (keyValue === ';') {
        key.classList.add('key-edit-highlight');
        // 分号键显示为按下状态
        key.classList.add('pressed');
    }
    if (keyValue === 'j') {
        key.classList.add('key-edit-highlight');
    }
}

// 编辑模式样式
function applyEditModeStyles(key, keyValue) {
    const editKeys = {
        'i': { alt: '↑', class: 'key-edit-highlight' },
        'j': { alt: '←', class: 'key-edit-highlight' },
        'k': { alt: '↓', class: 'key-edit-highlight' },
        'l': { alt: '→', class: 'key-edit-highlight' },
        'h': { alt: 'Home', class: 'key-edit-highlight' },
        ';': { alt: 'End', class: 'key-edit-highlight' },
        'o': { alt: 'O', class: 'key-edit-highlight' },
        'Tab': { alt: 'Alt', class: 'key-edit-highlight' }
    };

    if (editKeys[keyValue]) {
        key.classList.add(editKeys[keyValue].class);

        if (keyValue === 'Tab') {
            const keyLabel = key.querySelector('.key-label');
            const keyAltLabel = key.querySelector('.key-alt-label');
            if (keyLabel) keyLabel.style.display = 'none';
            if (keyAltLabel) {
                keyAltLabel.style.display = '';
                keyAltLabel.textContent = 'Alt';
            }
        } else {
            // 保存原始文本
            getOriginalText(key, keyValue);
            // 更新文本
            const keyLabel = key.querySelector('.key-label');
            if (keyLabel) {
                keyLabel.textContent = editKeys[keyValue].alt;
            } else {
                key.textContent = editKeys[keyValue].alt;
            }
        }
    }

    // m 键显示为 AppsKey 图标
    if (keyValue === 'm') {
        key.classList.add('key-edit-highlight');
        getOriginalText(key, keyValue);
        key.innerHTML = createAppsKeyIcon();
    }
}

// Win 模式样式
function applyWinModeStyles(key, keyValue) {
    if (keyValue === 'CapsLock') {
        const capslockCombo = key.querySelector('.capslock-combo');
        const capslockLabel = key.querySelector('.capslock-label');

        if (capslockCombo) capslockCombo.style.display = 'none';
        if (capslockLabel) {
            capslockLabel.style.display = '';
            capslockLabel.textContent = 'CapsLock';
        }
        key.classList.add('key-capslock-highlight');
    }

    // Win 键显示为按下状态
    if (keyValue === 'Win') {
        key.classList.add('pressed');
    }
}

// 切换主题
function toggleTheme() {
    KeyboardState.isDarkMode = !KeyboardState.isDarkMode;
    document.documentElement.setAttribute('data-theme', KeyboardState.isDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', KeyboardState.isDarkMode ? 'true' : 'false');
}

// 加载主题偏好
function loadThemePreference() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        KeyboardState.isDarkMode = true;
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// 启动
document.addEventListener('DOMContentLoaded', init);
