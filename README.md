# MMM-OdessaEvents
MagicMirror module for showing public events in Odessa
> This is an extension to the [MagicMirror](https://github.com/MichMich/MagicMirror) project. It shows public events in Odessa. Unfortunaly I didn't find any RSS with information about public events. So I get these data from http://www.kassir24.com.ua/


## Installation
Run these commands at the root of your magic mirror install.

```shell
cd modules
git clone https://github.com/vyazadji/MMM-OdessaEvents
cd MMM-OdessaEvents
npm install
```

## Using the module
To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
{
    module: 'MMM-OdessaEvents',
    config: {
        // See below for configurable options
    }
}
```
