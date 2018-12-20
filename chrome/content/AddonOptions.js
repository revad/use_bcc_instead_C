UseBccInstead.UseBccInsteadPrefs =
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
    removeEventListener("load", UseBccInstead.UseBccInsteadPrefs.onLoad, true);

    var widget = document.getElementById("maxCount");
    widget.value = UseBccInstead.UseBccInsteadUtil.getIntPref("extensions.usebccinstead.nonBccCount", 10);

    widget = document.getElementById("defaultNewMsgMode");
    widget.selectedIndex = UseBccInstead.UseBccInsteadUtil.getIntPref("extensions.usebccinstead.defaultNewMsgMode", -1) + 1;

    widget = document.getElementById("forceBccCheckbox");
    widget.focus();

    var thisDialog = document.getElementById("UseBccInstead.PrefsWindow");
    widget = thisDialog.getButton("cancel");
    widget.label = UseBccInstead.UseBccInsteadUtil.getLocalizedString("closeButton.label");
  },

  validateCount: function()
  {
    if(UseBccInstead.UseBccInsteadPrefs.inEditCount)
    {
      return false;
    }

    UseBccInstead.UseBccInsteadPrefs.inEditCount = true;
    var widget = document.getElementById("maxCount");
    var s = widget.value;
    var re = /^\d+$/;
    var count = parseInt(s, 10);
    var result = false;

    if((null == s.match(re)) || (isNaN(count)) || (count < 0))
    {
      alert(UseBccInstead.UseBccInsteadUtil.getLocalizedString("options.countError"));
      widget.focus();
      result = false;
    }
    else
    {
      UseBccInstead.UseBccInsteadUtil.setIntPref("extensions.usebccinstead.nonBccCount", count);
      result = true;
    }

    UseBccInstead.UseBccInsteadPrefs.inEditCount = false;
    return result;
  },

  updateNewMsgMode: function()
  {
    var widget = document.getElementById("defaultNewMsgMode");
    UseBccInstead.UseBccInsteadUtil.setIntPref("extensions.usebccinstead.defaultNewMsgMode", widget.selectedItem.value);
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
    uri.spec = "http://usebccinstead.mozdev.org";
    var protocolSvc = Components.classes["@mozilla.org/uriloader/external-protocol-service;1"].getService(Components.interfaces.nsIExternalProtocolService);
    protocolSvc.loadUrl(uri);
    protocolSvc = null;
    uri = null;
  },

  showHelpWindow: function()
  {
    window.open("chrome://usebccinstead/content/Help.xul", "", "chrome,width=600,height=300,resizable,centerscreen");
  }
}

window.addEventListener("load", UseBccInstead.UseBccInsteadPrefs.onLoad, true);
