var Dropbox = require( './dropbox' )

/**
 * Volume Constructor
 * @return {Volume}
 */
function Volume( options ) {
  
  if( !(this instanceof Volume) )
    return new Volume( options )
  
  this.options = options || {}
  this.fs = new Dropbox.FileSystem( this.options )
  
  this.info = {
    name: '',
    uid: ''
  }
  
}

// Exports
module.exports = Volume

/**
 * Volume Prototype
 * @type {Object}
 */
Volume.prototype = {
  
  constructor: Volume,
  
  get id() {
    return this.info.uid
  },
  
  get name() {
    return 'Dropbox - ' + this.info.name
  },
  
  init: function( done ) {
    
    done = done.bind( this )
    
    this.fs.init( function( error, info ) {
      if( error ) { return done( error ) }
      this.info = info
      done()
    }.bind( this ))
    
    return this
    
  },
  
}
