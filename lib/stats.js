/**
 * Stats Constructor
 * @return {Stats}
 */
function Stats( info ) {
  
  if( !(this instanceof Stats) )
    return new Stats( info )
  
  this._info = info
  
  this.dev     = 0
  this.ino     = 0
  this.mode    = 0
  this.nlink   = 0
  this.uid     = info.uid || 0
  this.gid     = 0
  this.rdev    = 0
  this.size    = info.size
  this.blksize = 0
  this.blocks  = 0
  
  this.atime = new Date()
  this.mtime = new Date( info.modifiedAt )
  this.ctime = new Date( info.modifiedAt )
  
}

// Exports
module.exports = Stats

/**
 * Stats Prototype
 * @type {Object}
 */
Stats.prototype = {
  
  constructor: Stats,
  
  isFile: function() {
    return this._info.isFile
  },
  
  isDirectory: function() {
    return this._info.isFolder
  },
  
  isBlockDevice: function() {
    return false
  },
  
  isCharacterDevice: function() {
    return false
  },
  
  isSymbolicLink: function() {
    return false // TODO
  },
  
  isFIFO: function() {
    return false // TODO
  },
  
  isSocket: function() {
    return false // TODO
  }
  
}
