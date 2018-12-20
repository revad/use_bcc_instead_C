UseBccInstead.CustomizeToolbarWindowOverlay =
{
  onUnloadNeeded: false,

  onLoad: function()
  {
    // remove to avoid duplicate initialization
    removeEventListener("load", UseBccInstead.CustomizeToolbarWindowOverlay.onLoad, true);

    // if the opening window exposes a function we need to call on close, note it
    if(window.opener.UseBccInsteadOnCustomizeClose)
    {
      UseBccInstead.CustomizeToolbarWindowOverlay.onUnloadNeeded = true;
    }
  },

  onUnload: function()
  {
    // remove to avoid duplicate initialization
    removeEventListener("unload", UseBccInstead.CustomizeToolbarWindowOverlay.onUnload, true);

    // if we need to do something, do it now
    if(UseBccInstead.CustomizeToolbarWindowOverlay.onUnloadNeeded)
    {
      window.opener.UseBccInsteadOnCustomizeClose();
    }
  }
}

// this overlay's work is needed only on TB 3.2 and below
if(!UseBccInstead.UseBccInsteadUtil.isTB3_3())
{
  window.addEventListener("load", UseBccInstead.CustomizeToolbarWindowOverlay.onLoad, true);
  window.addEventListener("unload", UseBccInstead.CustomizeToolbarWindowOverlay.onUnload, true);
}

