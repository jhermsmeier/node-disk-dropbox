var API = require( 'dropbox' )
var Path = require( 'path' )

/**
 * FileSystem Constructor
 * @return {FileSystem}
 */
function FileSystem( options ) {
  
  if( !(this instanceof FileSystem) )
    return new FileSystem( options )
  
  this._client = new API.Client( options )
  
  this._authDriver = new API.AuthDriver
    .NodeServer( 8191 )
  
  this._client.authDriver( this._authDriver )
  
}

// Exports
module.exports = FileSystem

// fs.Stats
FileSystem.Stats = require( './stats' )
FileSystem.DELIMITER = '/'
FileSystem.normalizePath = function( path ) {
  return Path.normalize( path )
    .replace( /\\/g, FileSystem.DELIMITER )
}

/**
 * FileSystem Prototype
 * @type {Object}
 */
FileSystem.prototype = {
  
  constructor: FileSystem,
  
  init: function( done ) {
    done = done.bind( this )
    this._client.authenticate( function( error, client ) {
      if( error ) { return done( error ) }
      client.getAccountInfo({ httpCache: true }, done )
    })
  },
  
  rename: function( oldPath, newPath, done ) {
    
    oldPath = FileSystem.normalizePath( oldPath )
    newPath = FileSystem.normalizePath( newPath )
    done = done.bind( this )
    
    this._client.move( oldPath, newPath, done )
    
  },
  
  stat: function( path, done ) {
    
    var client = this._client
    
    path = FileSystem.normalizePath( path )
    done = done.bind( this )
    
    client.stat( path, {
      httpCache: true
    }, function( error, stats ) {
      if( error ) { return done( error ) }
      stats.uid = client.dropboxUid()
      done( null, new FileSystem.Stats( stats ) )
    })
    
  },
  
  realpath: function( path, cache, done ) {
    
    if( typeof cache === 'function' ) {
      done = cache
      cache = null
    }
    
    path = FileSystem.normalizePath( path )
    done = done.bind( this )
    
    this._client.stat( path, {
      httpCache: !!cache
    },function( error, stat ) {
      if( error ) { return done( error ) }
      done( null, stat.path )
    })
    
  },
  
  unlink: function( path, done ) {
    path = FileSystem.normalizePath( path )
    done = done.bind( this )
    this._client.unlink( path, done )
  },
  
  rmdir: function( path, done ) {
    path = FileSystem.normalizePath( path )
    done = done.bind( this )
    this._client.remove( path, done )
  },
  
  mkdir: function( path, mode, done ) {
    path = FileSystem.normalizePath( path )
    done = done.bind( this )
    this._client.mkdir( path, done )
  },
  
  readdir: function( path, done ) {
    path = FileSystem.normalizePath( path )
    done = done.bind( this )
    this._client.readdir( path, done )
  },
  
  readFile: function( filename, options, done ) {
    
    if( typeof options === 'function' ) {
      done = options
      options = null
    }
    
    filename = FileSystem.normalizePath( filename )
    done = done.bind( this )
    options = options || {}
    options.arrayBuffer = true
    
    this._client.readFile( filename, function( err, data ) {
      options.encoding != null ?
        done( err, data.toString( options.encoding ) ) :
        done( err, data )
    })
    
  },
  
  writeFile: function( filename, data, options, done ) {
    
    if( typeof options === 'function' ) {
      done = options
      options = null
    }
    
    filename = FileSystem.normalizePath( filename )
    done = done.bind( this )
    
    this._client.writeFile( filename, data, done )
    
  },
  
  exists: function( path, done ) {
    path = FileSystem.normalizePath( path )
    done = done.bind( this )
    this._client.stat( path, function( error, stat ) {
      if( error != null ) {
        error.status == 404 ?
          done( null, false ) :
          done( error )
      } else {
        done( null, true )
      }
    })
  },
  
}
