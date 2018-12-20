UseBccInstead.extendedRecipientsColumnHandler =
{
  getCellText: function(row, col)
  {
    // get the message's header so that we can extract the TO, CC, and BCC fields
    var hdr = gDBView.getMsgHdrAt(row);

    //UseBccInstead.extendedReipientsColumn.enumProperties(hdr);
    return UseBccInstead.extendedReipientsColumn.buildCellResultString(hdr);
  },

  getSortStringForRow: function(hdr)
  {
    return UseBccInstead.extendedReipientsColumn.buildCellResultString(hdr);
  },

  isString: function()
  {
    return true;
  },

  getCellProperties: function(row, col, props)
  {
  },

  getRowProperties: function(row, props)
  {
  },

  getImageSrc: function(row, col)
  {
    return null;
  },

  getSortLongForRow: function(hdr)
  {
    return 0;
  }
}

