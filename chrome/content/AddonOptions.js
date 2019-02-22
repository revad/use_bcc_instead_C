UseBccInsteadC.UseBccInsteadCPrefs =
{
  inEditCount: false,

  showMozillazine: function()
  {
    var uri = Components.classes["@mozilla.org/network/standard-url;1"].createInstance(Components.interfaces.nsIURI);
    uri.spec = "http://kb.mozillazine.org/BCC";
    var protocolSvc = Components.classes["@mozilla.org/uriloader/external-protocol-service;1"].getService(Components.interfaces.nsIExternalProtocolService);
    protocolSvc.loadUrl(uri);
    protocolSvc = null;
    uri = null;
  },

  onLoad: function()
  {
    // remove to avoid duplicate initialization
    removeEventListener("load", UseBccInsteadC.UseBccInsteadCPrefs.onLoad, true);

    var widget = document.getElementById("maxCount");
    widget.value = UseBccInsteadC.UseBccInsteadCUtil.getIntPref("extensions.usebccinsteadC.nonBccCount", 10);

    widget = document.getElementById("defaultNewMsgMode");
    widget.selectedIndex = UseBccInsteadC.UseBccInsteadCUtil.getIntPref("extensions.usebccinsteadC.defaultNewMsgMode", -1) + 1;

    widget = document.getElementById("forceBccCheckbox");
    widget.focus();

    var thisDialog = document.getElementById("UseBccInsteadC.PrefsWindow");
    widget = thisDialog.getButton("cancel");
    widget.label = UseBccInsteadC.UseBccInsteadCUtil.getLocalizedString("closeButton.label");
  },

  validateCount: function()
  {
    if(UseBccInsteadC.UseBccInsteadCPrefs.inEditCount)
    {
      return false;
    }

    UseBccInsteadC.UseBccInsteadCPrefs.inEditCount = true;
    var widget = document.getElementById("maxCount");
    var s = widget.value;
    var re = /^\d+$/;
    var count = parseInt(s, 10);
    var result = false;

    if((null == s.match(re)) || (isNaN(count)) || (count < 0))
    {
      alert(UseBccInsteadC.UseBccInsteadCUtil.getLocalizedString("options.countError"));
      widget.focus();
      result = false;
    }
    else
    {
      UseBccInsteadC.UseBccInsteadCUtil.setIntPref("extensions.usebccinsteadC.nonBccCount", count);
      result = true;
    }

    UseBccInsteadC.UseBccInsteadCPrefs.inEditCount = false;
    return result;
  },

  updateNewMsgMode: function()
  {
    var widget = document.getElementById("defaultNewMsgMode");
    UseBccInsteadC.UseBccInsteadCUtil.setIntPref("extensions.usebccinsteadC.defaultNewMsgMode", widget.selectedItem.value);
  },

  toggle: function(onInit)
  {
    var checked = document.getElementById("forceBcc").value;
    var maxCountLabel = document.getElementById("maxCountLabel");
    var maxCount = document.getElementById("maxCount");
    var force = document.getElementById("force");
    var play = document.getElementById("play");

    // seems we are called before the value is actually changed except on initial display
    if(!checked)
    {
      (onInit) ? maxCountLabel.disabled = false : maxCountLabel.disabled = true;
      (onInit) ? maxCount.disabled = false : maxCount.disabled = true;
      (onInit) ? force.disabled = false : force.disabled = true;
      (onInit) ? play.disabled = false : play.disabled = true;
    }
    else
    {
      (onInit) ? maxCountLabel.disabled = true : maxCountLabel.disabled = false;
      (onInit) ? maxCount.disabled = true : maxCount.disabled = false;
      (onInit) ? force.disabled = true : force.disabled = false;
      (onInit) ? play.disabled = true : play.disabled = false;
    }
  },

  showWebsite: function()
  {
    var uri = Components.classes["@mozilla.org/network/standard-url;1"].createInstance(Components.interfaces.nsIURI);
    uri.spec = "http://usebccinsteadC.mozdev.org";
    var protocolSvc = Components.classes["@mozilla.org/uriloader/external-protocol-service;1"].getService(Components.interfaces.nsIExternalProtocolService);
    protocolSvc.loadUrl(uri);
    protocolSvc = null;
    uri = null;
  },

  showHelpWindow: function()
  {
    window.open("chrome://usebccinsteadC/content/Help.xul", "", "chrome,width=600,height=300,resizable,centerscreen");
  }
}

window.addEventListener("load", UseBccInsteadC.UseBccInsteadCPrefs.onLoad, true);
