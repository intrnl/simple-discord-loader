# Simple Discord Loader

Really, really dumb and simple client mod that loads specified CSS files and watches any changes to it.

## Installation

### Configuration

Create a file in `./data/config.json`, make the directory if it does not exist. Below is an example config, any paths are allowed, relative paths will be resolved to the data directory.

```json
{
  "css": [
    "./style.css"
  ]
}
```

### Injection

Next up is injecting this client mod, there are two ways. The first one injects to the local Discord installation directory, and is less prone to being overridden by updates. The second one injects to the roaming directory that Discord puts modules and data in.

The latter is recommended on Linux if you do not have any sudo rights.

### Local Discord directory

1. Navigate to the following directory
   - Windows: `%localappdata%\Discord\app-x.x.xxx\resources\`
   - macOS: `/Applications/Discord.app/Contents/Resources/`
   - Linux:
     - Debian, Ubuntu and any other Debian based distros  
       `/usr/share/discord/resources`
     - Fedora and other Red Hat based distros (RPMFusion)  
       `/usr/lib64/discord/resources`
     - Arch Linux and other distros  
       `/opt/discord/resources/`
2. Create a directory named `app`
3. Write these following files
   - `package.json`
     ```json
     {
       "main": "index.js"
     }
     ```
   - `index.js`  
     For Windows users, either use forward slashes or double backslashes
     ```js
     require('<path to the client mod directory>/js/main.js');
     ```

### Roaming Discord directory

1. Navigate to the following directory
   - Windows: `%appdata%\discord\x.x.xxx\modules\discord_desktop_core/`
   - macOS: `~/Library/Application Support/discord/x.x.xxx/modules/discord_desktop_core/`
   - Linux: `~/.config/discord/x.x.xxx/modules/discord_desktop_core/`
2. Write the following line in the start of `index.js`  
   Again, for Windows users, either use forward slashes or double backslashes
   ```js
   require('<path to client mod directory>/js/main.js');
   ```
