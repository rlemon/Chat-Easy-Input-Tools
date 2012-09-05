##Chat-Easy-Input-Tools
Provides keyboard shortcuts for common text formatting commands, reducing 
the dependency on mouse usage. Current version does not have a configurable set of hotkeys but later versions will. 

### How to use.

_All of the following commands are run if the user has focus in the chat input area._

  * <kbd>ALT</kbd> + <kbd>A</kbd> inserts a [link](# "with optional title").  
  * <kbd>ALT</kbd> + <kbd>T</kbd> inserts a <kbd>site-tag</kbd>.  
  * <kbd>ALT</kbd> + <kbd>B</kbd> formats text to **bold**.  
  * <kbd>ALT</kbd> + <kbd>I</kbd> formats text to _italics_.  
  * <kbd>ALT</kbd> + <kbd>S</kbd> formats text to ~~strike-through~~.  
  * <kbd>ALT</kbd> + <kbd>C</kbd> formats text to `code`.  


###Installation 
Click [Here](https://github.com/rlemon/Chat-Easy-Input-Tools/raw/master/chateasyinput.user.js) to install the latest working version.  
Remember to refresh any open chat windows for the script to take effect. 


##### Restrictions
The script does not alter the user selection. If trailing spaces exist they are wrapped with the formatting option and thus will break the formatting.  
In tags spaces are not converted into dashes (they probably should be).  
`insert image` _may_ require a user upload and therefore will be put off until a good UX decision is made for how to handle this.  


###License
This software is released under the WTFPL. A full version can be viewed [here](https://github.com/rlemon/Chat-Easy-Input-Tools/blob/master/LICENSE.md).