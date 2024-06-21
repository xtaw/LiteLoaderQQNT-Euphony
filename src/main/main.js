const { ipcMain } = require("electron");

const Process = require('process');
const os = require('os');

exports.onBrowserWindowCreated = window => {
    window.webContents.on('ipc-message-sync', (event, channel) => {
        if (channel == '___!boot') {
            event.returnValue = {
                enabled: true,
                webContentsId: window.webContents.id.toString(),
            };
        }
    });
}

let NodeIQQNTWrapperSession;

const originalDlopen = Process.dlopen;
Process.dlopen = (module, filename, flags = os.constants.dlopen.RTLD_LAZY) => {
    const originalResult = originalDlopen(module, filename, flags);
    for (const name in module.exports) {
        module.exports[name] = new Proxy(module.exports[name], {
            construct: (target, args) => {
                const result = new target(...args);
                if (name == 'NodeIQQNTWrapperSession') {
                    NodeIQQNTWrapperSession = result;
                }
                return result;
            }
        });
    }
    return originalResult;
}

ipcMain.handle('LiteLoader.euphony.getClientKey', async () => {
    return await NodeIQQNTWrapperSession.getTicketService().forceFetchClientKey('');
});

ipcMain.handle('LiteLoader.euphony.getPskey', async (event, uin, clientKey, keyIndex, domain) => {
    try {
        const redirectResponse = await fetch(`https://ssl.ptlogin2.qq.com/jump?ptlang=1033&clientuin=${ uin }&clientkey=${ clientKey }&u1=https%3A%2F%2F${ domain }&keyindex=${ keyIndex }`, {
            method: 'GET',
            redirect: 'manual'
        });
        if (redirectResponse.status != 302) {
            return  {
                error: `An error occurred while getting redirect url. Details: ${ redirectResponse.statusText }`
            };
        }
        const response = await fetch(redirectResponse.headers.get('Location'), {
            method: 'GET',
            redirect: 'manual'
        });
        if (response.status != 302) {
            return {
                error: `An error occurred while getting cookies. Details: ${ response.statusText }`
            };
        }
        for (const cookie of response.headers.getSetCookie()) {
            if (cookie.startsWith('p_skey=') && cookie.indexOf(';') != 7) {
                return cookie.substring(7, cookie.indexOf(';'));
            }
        }
        return {
            error: 'Could not find pskey.'
        };
    } catch (error) {
        return {
            error: `An unknown error occurred. Details: ${ error.message }`
        };
    }
});

ipcMain.handle('LiteLoader.euphony.drawLuckyCard', async (event, uin, friendUin, pskey) => {
    try {
        const response = await fetch('https://ti.qq.com/interactive_logo/word/proxy/domain/oidb.tim.qq.com/v3/oidbinterface/oidb_0xdd0_0?sdkappid=39998', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `p_uin=o0${ uin }; p_skey=${ pskey };`,
            },
            body: JSON.stringify({
                uin,
                frd_uin: friendUin,
            }),
        });
        if (!response.ok) {
            return {
                error: `An error occurred while sending post request. Details: ${ response.statusText }`
            };
        }
        return await response.json();
    } catch (error) {
        return  {
            error: `An unknown error occurred. Details: ${ error.message }`
        };
    }
});