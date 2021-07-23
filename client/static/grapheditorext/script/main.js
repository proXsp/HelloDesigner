var ExtendMain = function (option) {
  this.extOption = new ExtOption(option); 
}

ExtendMain.prototype = {

  /**
   * initialization.
   */
  init: function() {
    window._extMain = this;
    this.loadSkin();
  },

  /**
   * trigger event.
   * @param {*} target event target.
   * @param {*} eventName event name.
   * @param {*} data event data.
   * @returns 
   */
  trigger: function (target, eventName, data) {
		if (target && target.dispatchEvent) {
			var event = this._createEvent(eventName, data);
			target.dispatchEvent(event);
			return event.data;
		}
	},
	
	/**
   * create event.
   * @param {*} eventName event name.
   * @param {*} data event data.
   * @returns 
   */
   _createEvent: function (eventName, data) {
		var event = new Event(eventName);
		event.data = data ? data : {};
		return event;
	},

  /**
   * load skin.
   */
  loadSkin: function() {
    let skin = this.extOption.getSkin();
    let skinEl = document.createElement('link');
    skinEl.rel = 'stylesheet';
    skinEl.type = 'text/css';
    skinEl.href = '../grapheditorext/style/editorskin_' + skin + '.css';
    document.head.appendChild(skinEl);
    if (skin == 'black') {
      Format.prototype.inactiveTabBackgroundColor = '#343434';
    }
  },

  /**
   * before Editor Create
   * @param {*} Editor 
   * @param {*} urlParams 
   * @param {*} themes 
   */
  beforeEditorCreate: function(Editor, urlParams, themes) {
    Editor.useLocalStorage = this.extOption.isUseLocalStorage();

    // prototype extend.
    let EditorPrototypeExt = this.extOption.getExtPrototypes('Editor');
    if (EditorPrototypeExt) {
      for (let k in EditorPrototypeExt) {
        Editor.prototype[k] = EditorPrototypeExt[k];
      }
    }
  },

  /**
   * after Editor Created
   * @param {*} editor 
   */
  afterEditorCreated: function(editor) {
    this.editor = editor;
    editor.graph.defaultPageVisible = this.extOption.isPageVisiDefault();
  },

  /**
   * before EditorUi create
   * @param {*} EditorUi 
   * @param {*} editor 
   * @param {*} urlParams 
   */
  beforeEditorUiCreate: function(EditorUi, editor, urlParams) {
    if (this.extOption.isHideMenubar()) {
      EditorUi.prototype.menubarHeight = 0;
    }
    if (this.extOption.isHideFooter()) {
      EditorUi.prototype.footerHeight = 0;
    }

    // prototype extend.
    let EditorUiPrototypeExt = this.extOption.getExtPrototypes('EditorUi');
    if (EditorUiPrototypeExt) {
      for (let k in EditorUiPrototypeExt) {
        EditorUi.prototype[k] = EditorUiPrototypeExt[k];
      }
    }
  },

  /**
   * after EditorUi created
   * @param {*} editorUi 
   */
  afterEditorUiCreated: function(editorUi) {
    this.editorUi = editorUi;
  },

  /**
   * before EditorUi Init
   * @param {*} editorUi 
   * @param {*} params 
   */
  beforeEditorUiInit: function(editorUi, params) {
    
  },

  /**
   * after EditorUi Inited
   * @param {*} editorUi 
   */
  afterEditorUiInited: function(editorUi) {
    this.trigger(window, 'afterEditorUiInited', this);
  }
}

/**
 * Object for Option.
 * @param {extend option}} option 
 */
var ExtOption = function(option) {
  this.option = option;
  if (!option) {
    this.option = window._editorOption;
  }
  if (!this.option) {
    this.option = {};
  }
  if (!this.option.uiOption) {
    this.option.uiOption = {
      pageVisiDefault: true
    };
  }
  if (!this.option.other) {
    this.option.other = {};
  }
  // console.log('extend graph whti option:\n', this.option);
}

ExtOption.prototype = {
  isHideMenubar: function () {
    return this.option.uiOption.hideMenubar;
  },
  isHideFooter: function () {
    return this.option.uiOption.hiderFooter;
  },
  isPageVisiDefault: function () {
    return this.option.uiOption.pageVisiDefault === true;
  },
  isUseLocalStorage: function () {
    return this.option.other.useLocalStorage === true;
  },
  getSkin: function() {
    return this.option.uiOption.skin || 'default';
  },
  getExtPrototypes: function (moduleName) {
    if (this.option.prototypeExt) {
      return this.option.prototypeExt[moduleName];
    }
  }
}