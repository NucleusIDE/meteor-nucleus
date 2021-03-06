Template.nucleusEditor.helpers({
  config: function() {
    return function(editor) {
      // This method gets called when sharejs has initialized the ace-editor.
      // `editor` argument here is the ace-instance provided by sharejs.
      // We use it to initialize `NucleusEditor`
      UltimateIDE.Editor.initialize(editor);
    };
  },
  setMode: function() {
    return function(editor) {
      /**
       * This function is called by sharejs whenever the document being edited in ace changes.
       * We do not set the mode here because it is done in NucleusEditor.initialize
       * NucleusEditor.initialize gets called everytime the doc being editted changes.
       * This is done by sharejs, we simply change the session key for doc and sharejs
       * changes the actual doc for us, and it does it such that editor gets initialized again,
       * everytime
       */
      var selectedFile = Session.get("nucleus_selected_file");

      //Events get unregistered on document change
      UltimateIDE.Editor.registerAllEvents();
      UltimateIDE.Editor.editor.scrollToRow(0);
    };
  },
  docid: function() {
    return Session.get('nucleus_selected_doc_id') || 'scratch';
  }
});

//Autorun to set file for editing when user clicks on a file in sidebar
Deps.autorun(function() {
  var selectedFile = Session.get('nucleus_selected_file');
  if (!selectedFile) return;

  Deps.nonreactive(function() {
    UltimateIDE.Files.editFile(selectedFile);
  });
});
