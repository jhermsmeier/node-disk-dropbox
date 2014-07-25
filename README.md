# Dropbox File System

[![npm](http://img.shields.io/npm/v/disk-dropbox.svg?style=flat)](https://npmjs.org/disk-dropbox)


Install via [npm](https://npmjs.org)
------------------------------------
```sh
$ npm install disk-dropbox
```


## Usage Example

```js
var Dropbox = require( 'disk-dropbox' )

// Create a volume with your credentials
var volume = new Dropbox.Volume({
  key: 'xxxxxxxxxxxxxxx',
  secret: 'xxxxxxxxxxxxxxx',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  uid: '00000000'
})

// Initialize the volume
volume.init( function( error ) {
  if( error ) { handleError( error ) }
  // You're authenticated now, and `volume.fs`
  // has node fs module compatible API (see 'disk-fs' module)
  volume.fs.readdir( '/', function( error, entries ) {
    console.log( 'readdir', entries )
  })
})
```
