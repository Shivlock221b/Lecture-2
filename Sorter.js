// importing fs module
const fs = require("fs");

// importing os home directory path
const home = require("os").homedir();

// creating path for the files to be imported
let folderPath = home + "/Downloads";

// command to get all files from the path
let files = fs.readdirSync(folderPath);

// loop to process individual files
for (let i = 0; i < files.length; i++) {
    sortFolder(files[i]);
}

function getExtension(file) {
    let arr = file.split(".");
    return arr[arr.length - 1];
}

function checkExtensionFolder(ext) {
    
    if (ext == "txt" || ext == "doc" || ext == "pdf" || ext == "pptx" || ext == "docx" || ext == "xlsx" || ext == "ics" || ext == "apk") {
        // the folder of documents exists or not using the following path
        let extFolderPath = `${folderPath}/Documents`;
        return fs.existsSync(extFolderPath);
    } else if (ext == "jpeg" || ext == "png" || ext == "jpg" || ext == "gif" || ext == "JPG" || ext == "PNG") {
        let extFolderPath = `${folderPath}/Images`;
        return fs.existsSync(extFolderPath);
    } else if (ext == "zip" || ext == "dmg" || ext == "pkg") {
        let extFolderPath = `${folderPath}/Installables`;
        return fs.existsSync(extFolderPath);
    } else if (ext == "MOV" || ext == "mkv" || ext == "mp4") {
        let extFolderPath = `${folderPath}/Movies`;
        return fs.existsSync(extFolderPath);
    } else if (ext == "jar" || ext == "gz" || ext == "htm") {
        let extFolderPath = `${folderPath}/Misc`;
        return fs.existsSync(extFolderPath);
    }
}

function createExtensionFolder(ext) {
    if (ext == "txt" || ext == "doc" || ext == "pdf" || ext == "pptx" || ext == "docx" || ext == "xlsx" || ext == "ics" || ext == "apk") {
        // create command to create a folder for the extension
        let extFolderPath = `${folderPath}/Documents`;
        fs.mkdirSync(extFolderPath);
    } else if (ext == "jpeg" || ext == "png" || ext == "jpg" || ext == "gif" || ext == "JPG" || ext == "PNG") {
        let extFolderPath = `${folderPath}/Images`;
        fs.mkdirSync(extFolderPath);
    } else if (ext == "zip" || ext == "dmg" || ext == "pkg") {
        let extFolderPath = `${folderPath}/Installables`;
        fs.mkdirSync(extFolderPath);
    } else if (ext == "MOV" || ext == "mkv" || ext == "mp4") {
        let extFolderPath = `${folderPath}/Movies`;
        fs.mkdirSync(extFolderPath);
    } else if (ext == "jar" || ext == "gz" || ext == "htm") {
        let extFolderPath = `${folderPath}/Misc`;
        fs.mkdirSync(extFolderPath);
    }
}

function moveFile(file, ext) {
    if (ext == "txt" || ext == "doc" || ext == "pdf" || ext == "pptx" || ext == "docx" || ext == "xlsx" || ext == "ics" || ext == "apk") {
        // the $ sign and the parantheses are used because the exact path is stored inside the variable 
        //therefore we dont know about it but we still have to add it to the path
        let sourceFile = `${folderPath}/${file}`;
        // back slash means we have to go inside the folder
        let destinationFile = `${folderPath}/Documents/${file}`;
        fs.copyFileSync(sourceFile, destinationFile);
        fs.unlinkSync(sourceFile);
    } else if (ext == "jpeg" || ext == "png" || ext == "jpg" || ext == "gif" || ext == "JPG" || ext == "PNG") {
        let sourceFile = `${folderPath}/${file}`;
        let destinationFile = `${folderPath}/Images/${file}`;
        fs.copyFileSync(sourceFile, destinationFile);
        fs.unlinkSync(sourceFile);
    } else if (ext == "zip" || ext == "dmg" || ext == "pkg") {
        let sourceFile = `${folderPath}/${file}`
        let destinationFile = `${folderPath}/Installables/${file}`;
        fs.copyFileSync(sourceFile, destinationFile);
        fs.unlinkSync(sourceFile);
    } else if (ext == "MOV" || ext == "mkv" || ext == "mp4") {
        let sourceFile = `${folderPath}/${file}`;
        let destinationFile = `${folderPath}/Movies/${file}`;
        fs.copyFileSync(sourceFile, destinationFile);
        fs.unlinkSync(sourceFile);
    } else if (ext == "jar" || ext == "gz" || ext == "htm")     {
        let sourceFile = `${folderPath}/${file}`;
        let destinationFile = `${folderPath}/Misc/${file}`;
        fs.copyFileSync(sourceFile, destinationFile);
        fs.unlinkSync(sourceFile);
    }
}

// function processing each file
function sortFolder(file) {
    let ext = getExtension(file);

    // check if folder already exists
    let folderExist = checkExtensionFolder(ext);
    // true for all except all falsy values = false, null, underfined, "";
    if (folderExist) {
        // folder exists mode file 
        moveFile(file, ext);
    } else {
        // create new folder for the extension if doesnt exist
        createExtensionFolder(ext);
        moveFile(file, ext);
    }
}