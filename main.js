const {app, BrowserWindow, Menu} = require('electron')


//GERENCIA ARQUIVOS E URLs USANDO OS APLICATIVOS PADRÃO DO SISTEMA, RELACIONADO A INTEGRAÇÃO COM O DESKTOP
const { shell } = require('electron') 

let window





//CRIA O MENU NA PARTE SUPERIOR DA JANELA
var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
        submenu: [
            {label: 'Cadastros'},
            {
                label: 'Google',
                click() {
                    shell.openExternal('www.google.com')
                }
            },
            { type: 'separator'},
            {
                label: 'Sair',
                click() {
                    app.quit()
                }
            }
        ]
    },
    {
        label: 'Cadastros',
        submenu: [
            {label: 'Cadastrar'},
            {label: 'Pesquisar'},
            { type: 'separator'},
            {
                label: 'Sair',
                click() {
                    app.quit()
                }
            }
        ]
    }
])

function createWindow() {
    
    window = new BrowserWindow({
        width: 1300,
        height: 800,
        transparent: false,
        frame: false
        //icon: __dirname + '/_assets/_imgs/icon.png'
    })

    window.loadFile('_src/index/index.html')

    //window.webContents.openDevTools()

    window.on('closed', () => {
        window = null
    })

    //APLICA O MENU CRIADO NA VARIAVEL 'menu' NO SISTEMA
    Menu.setApplicationMenu(menu)

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})
