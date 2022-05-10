export class QWSimpleTabPanel extends HTMLElement {

    static get observedAttributes() {
        return ['tab-names', 'selected-index'];
    }

    constructor(tabNames = null, selectIndex = null) {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.tabPanelWrapper = this.createElement('div', { className: 'tab-panel-wrapper' });
        if (tabNames && selectIndex != null) {
            this._tabNames = tabNames;
            this._selectIndex = selectIndex;
            this._initTabs();
        }
        this._initCss();
    }

    get selectIndex() {
        return this.getAttribute('selected-index');
    }

    set selectIndex(val) {
        if (val) {
            this.setAttribute('selected-index', val);
        } else {
            this.removeAttribute('selected-index');
        }
    }

    get tabNames() {
        return this.getAttribute('tab-names');
    }

    set tabNames(val) {
        if (val) {
            this.setAttribute('tab-names', val);
        } else {
            this.removeAttribute('tab-names');
        }
    }

    set height(val) {
        this.setAttribute('height', val);
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "tab-names":
                if (this._isChanged(oldVal, newVal)) {
                    this._tabNames = newVal.split(',');
                    this._initTabs();
                }
                break;
            case "selected-index":
                if (this._isChanged(oldVal, newVal)) {
                    this._selectIndex = new Number(newVal);
                    this._setSelectedTab();
                }
                break;
            default:
                console.log(`attribute ${attrName} not exist`);
        }
    }

    onTabClick(){
        console.log("in order to receive notifications, you need to assign a handler, qwSipleTabPanel.onTabClick = (name) => console.log(name);");
    }

    _initTabs() {
        this.tabPanelWrapper.innerText = '';
        this._tabNames.forEach(item => {
            this.tabPanelWrapper.appendChild(this._createTab(item));
        });
        this._setSelectedTab();
        this.root.appendChild(this.tabPanelWrapper);
    }

    _initCss() {// Example 1
        const link = document.createElement('link');
        link.href = "/modules/qwSimpleTabPanel.css";
        link.rel = "stylesheet";
        this.root.appendChild(link);
    }

    // _initCss() {// Example 2
    //     const style = document.createElement('style');
    //     style.innerHTML = 
    //     `
    //     .tab-panel-wrapper {
    //         display: flex;
    //         justify-content: start;
    //     }
        
    //     .tab {
    //         padding: 20px;
    //     }
        
    //     .tab-selected {
    //         border-bottom: 3px solid #15BDF4;
    //     }
        
    //     .tab-text {
    //         user-select: none;
    //         color: #15BDF4;
    //         cursor: pointer;
    //         text-transform: uppercase;
    //         text-align: center;
    //         font-size: 19px;
    //     }
    //     `;
    //     this.root.appendChild(style);
    // }

    _createTab(name) {
        const tab = this.createElement('div', { className: 'tab' },
            this.createElement('span', { className: 'tab-text', innerText: name })
        );
        tab.addEventListener('click', () => {
            this._unSelectedAll();
            tab.classList.add("tab-selected");
            if (this.onTabClick && this.onTabClick instanceof Function) {
                this.onTabClick(name);
            }
        });
        return tab;
    }

    _unSelectedAll() {
        const children = Array.from(this.tabPanelWrapper.children);
        children.forEach(item => {
            item.classList.remove("tab-selected");
        });
    }

    _setSelectedTab() {
        if (this._selectIndex != null && this.tabPanelWrapper && this.tabPanelWrapper.children[this._selectIndex]) {
            this._unSelectedAll();
            this.tabPanelWrapper.children[this._selectIndex].classList.add("tab-selected");
        }
    }

    _isChanged(oldVal, newVal) {
        return (newVal && oldVal !== newVal);
    }

    createElement(tag, props, ...children) {
        const element = document.createElement(tag);
        Object.keys(props).forEach(key => element[key] = props[key]);
        if (children.length > 0) {
            children.forEach(child => {
                element.appendChild(child);
            });
        } return element;
    }
}