'use strict';


/**
 * Upload file to DHT
 * @param {Object} obj
 * @param {Object} obj.meta - All the meta associated with file
 * @param {Object} obj.content - base64 encoded content of the file
 * @return {object} Nicely formatted response
 */
function uploadFile(obj) {
    // Commit content of the file as an entry fileContent
    // TODO: allow chopping of file content
    var contentHash = commit("fileContent", obj.content);

    // Create metadata entry
    var fileMeta = {
        meta: obj.meta,
        content: [contentHash]
    }

    // Commit entry to DHT
    var fileHash = commit("fileMeta", fileMeta);

    // Add link to App.DNA TODO: change to parent directory
    commit("linkToFile", {
        Links: [
            {Base: App.DNA.Hash, Link: fileHash, Tag: 'file'}
        ]
    });

    // Return file meta info
    return {
        filePath: obj.meta.path,
        meta: obj.meta,
        hash: fileHash,
        preview: generateEntryPreview(fileMeta.meta.type, fileMeta.meta.size, fileMeta.content[0], obj.content),
        status: 2
    };
}


/**
 * Get all files at a certain location
 * @param {object} obj
 * @param {string} obj.hash - Hash of a location to serve
 * @param {string} obj.type - Type of entries to return (file, folder)
 * @return {object} Nicely formatted response with list of all entries in given folder
 */
function getAllFiles(obj) {
    var hash = App.DNA.Hash;
    return getLinks(hash, "file", {Load: true}).reduce(function(obj, e, i) {
        obj[e.Entry.meta.path] = {
            status: 2,
            meta: e.Entry.meta,
            hash: e.Entry.content[0],
            preview: generateEntryPreview(e.Entry.meta.type, e.Entry.meta.size, e.Entry.content[0]),
        };
        return obj;
    }, {});
}


/**
 * Return base64 string to display as preview in img tag
 * @param {string} hash - Hash of a resource to serve preview of
 * @return {string} String
 */
function getPreview(hash) {
    // TODO: finish this
    return getLinks(App.DNA.Hash, "linkToFile", {Load: true}).map(function(e) {
        return e.Entry 
    });
}


/**
 * Return content with right headers that would allow to download file
 * @param {string} hash - Hash of a resource to serve preview of
 * @return {string} Whatever is needed
 */
function getDownload(hash) {
    // TODO: finish this
    return getLinks(App.DNA.Hash, "linkToFile", {Load: true}).map(function(e) {
        return e.Entry 
    });
}


/**
 * Generate entry preview base64 encoded string if file can have a preview
 * @param {string} type - MIME type of the file
 * @param {int} size - size of the file
 * @param {string} content - base64 encoded content of the file
 * @return {string} Whatever is needed
 */
function generateEntryPreview(type, size, contentHash, contentBytes) {
    if (size && type && size < 1000000)
        if (type === "image/jpeg" || type === "image/png") 
            if (contentBytes)
                return contentBytes;
            else if (contentHash) {
                // Query for contentHash
                return get(contentHash);
            }
}


// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

/**
 * Called only when your source chain is generated
 * @return {boolean} success
 */
function genesis() {
    return true;
}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateCommit(entryName, entry, header, pkg, sources) {
    switch (entryName) {
        case "fileContent":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "fileMeta":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "linkToFile":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        default:
            // invalid entry name
            return true;
    }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validatePut(entryName, entry, header, pkg, sources) {
    switch (entryName) {
        case "fileContent":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "fileMeta":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "linkToFile":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        default:
            // invalid entry name
            return true;
    }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {*} entry - the entry data to be set
 * @param {object} header - header for the entry containing properties EntryLink, Time, and Type
 * @param {string} replaces - the hash for the entry being updated
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateMod(entryName, entry, header, replaces, pkg, sources) {
    switch (entryName) {
        case "fileContent":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "fileMeta":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "linkToFile":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        default:
            // invalid entry name
            return true;
    }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {string} hash - the hash of the entry to remove
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateDel(entryName, hash, pkg, sources) {
    switch (entryName) {
        case "fileContent":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "fileMeta":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "linkToFile":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        default:
            // invalid entry name
            return true;
    }
}

/**
 * Called to validate any changes to the local chain or DHT
 * @param {string} entryName - the type of entry
 * @param {string} baseHash - the hash of the base entry being linked
 * @param {?} links - ?
 * @param {*} pkg - the extra data provided by the validate[X]Pkg methods
 * @param {object} sources - an array of strings containing the keys of any authors of this entry
 * @return {boolean} is valid?
 */
function validateLink(entryName, baseHash, links, pkg, sources) {
    switch (entryName) {
        case "fileContent":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "fileMeta":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        case "linkToFile":
            // be sure to consider many edge cases for validating
            // do not just flip this to true without considering what that means
            // the action will ONLY be successfull if this returns true, so watch out!
            return true;
        default:
            // invalid entry name
            return true;
    }
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validatePutPkg(entryName) {
    return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateModPkg(entryName) {
    return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateDelPkg(entryName) {
    return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateLinkPkg(entryName) {
    return null;
}