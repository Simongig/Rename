const { join } = require('path');
const path = require('path')
const fs = require('fs');
//const [dir] = process.argv.slice(2);
const dir = ""
const files = fs.readdirSync(dir);
var regex = RegExp(/AEG...../);



files.forEach(file => {
  //substrahiert Artikelnummer von Dateinamenendung
  var filecheck = fs.statSync(path.join(dir, file));
  var file_dir = path.join(dir, file)
  if (filecheck.isFile()) {
    var new_file_path = returnFolderPath(file)
    moveFile(file_dir, new_file_path)
  }
})

function moveFile(old_path, new_path) {
  var data = old_path + " ----> " + new_path
  console.log(data)
  if (!fs.existsSync(new_path)) {
    try {
      fs.rename(old_path, new_path);
    } catch (error) {
      console.error(error)
    }
  } else {
    console.error("file already exists in folder")
  }
}

function returnFolderPath(file_name = "") {
  var found_folder;
  files.filter((search_folder) => {
    search_folder_code = search_folder.match(regex);
    if (search_folder_code != null) {
      search_folder_code = search_folder_code[0];
      if (file_name.startsWith(search_folder_code)) {
        var folder_check = fs.statSync(path.join(dir, search_folder));
        if (folder_check.isDirectory()) {
          found_folder = path.join(dir, search_folder, file_name);
        }
      }
    }
  });
  return found_folder;
}
