'use strict';

const Fs = require ('fs');
const Path = require ('path');
const Http = require ('http');

function SendMSM (Socket, Message) {
    Socket ['send'] (JSON ['stringify'] (new Object ({
        "header":{
            "messagePurpose": "commandRequest",
            "messageType": "commandRequest",
            "requestId":"c3014476-21b7-41f6-85d8-c964870a2444",
            "version": 1
        },
        "body": {
            "origin": {
                "type": "player"
            },
            "commandLine": `say §o§l§b(§3Mcbbsmis§b) §9Building ${Message}`,
            "version": 1
        }
    })))
};

function Deep (Socket, Data) {
    let Resource = new Array;
    let ParseBuild = JSON ['parse'] (Data ['join'] (''));
    Resource ['push'] (`建築物名稱: ${ParseBuild ['Headers'] ['Name']}`);
    Resource ['push'] (`建築物描述: ${ParseBuild ['Headers'] ['Description']}`);
    Resource ['push'] (`建築物成員: ${function (Contributors, Combination) {
    Contributors ['forEach'] (Value => {
    Combination ['push'] (`${Value ['Name']} (${Value ['Position']})`)});
    return Combination ['join'] (' | ');
    } (ParseBuild ['Headers'] ['Contributors'], new Array)}`);
        Resource ['push'] (`建築物團隊: ${ParseBuild ['Headers'] ['Team'] ['Name']}`);
        Resource ['push'] (`建築物類型: ${ParseBuild ['Headers'] ['Type']}`);
        Resource ['push'] (`建築物大小: ${ParseBuild ['Bodyers'] ['Blocks'] ['length'] + ParseBuild ['Bodyers'] ['Entitys'] ['length']} Bytes`);
        Resource ['push'] (`建築物唯碼: ${ParseBuild ['Headers'] ['Uuid']}`);
        Resource ['push'] (`建築物許可: ${ParseBuild ['Headers'] ['Certification'] ['PublicKey']}`);
        Resource ['forEach'] (Value => SendMSM (Socket, Value));
        ParseBuild ['Bodyers'] ['Commands'] ['forEach'](Value => {
            Socket ['send'] (JSON ['stringify'] (new Object ({
                "header":{
                    "messagePurpose": "commandRequest",
                    "messageType": "commandRequest",
                    "requestId":"0bc13120-c967-497a-ae74-27781617ba21",
                    "version": 1
                },
                "body": {
                    "origin": {
                        "type": "player"
                    },
                    "commandLine": Value ['Command'],
                    "version": 1
                }
            })));
            SendMSM (Socket, Value ['Tips'])
        });
        ParseBuild ['Bodyers'] ['Blocks'] ['forEach'](Value => {
            Socket ['send'] (JSON ['stringify'] (new Object ({
                "header":{
                    "messagePurpose": "commandRequest",
                    "messageType": "commandRequest",
                    "requestId":"e9fcaff0-a43d-4dd0-a1b3-b9d5e268e22c",
                    "version": 1
                },
                "body": {
                    "origin": {
                        "type": "player"
                    },
                    "commandLine": `SetBlock ${Value ['Location'] ['X']} ${Value ['Location'] ['Y']} ${Value ['Location'] ['Z']} ${Value ['Id']} ${Value ['Data']} ${Value ['Mode']}`,
                    "version": 1
                }
            })));
        });
        ParseBuild ['Bodyers'] ['Entitys'] ['forEach'](Value => {
            Socket ['send'] (JSON ['stringify'] (new Object ({
                "header":{
                    "messagePurpose": "commandRequest",
                    "messageType": "commandRequest",
                    "requestId":"c3014476-21b7-41f6-85d8-c964870a2444",
                    "version": 1
                },
                "body": {
                    "origin": {
                        "type": "player"
                    },
                    "commandLine": `Summon ${Value ['Id']} ${Value ['Location'] ['X']} ${Value ['Location'] ['Y']} ${Value ['Location'] ['Z']} ${Value ['Name']}`,
                    "version": 1
                }
            })));
        });
        SendMSM (Socket, '生成完畢')
};

function Local (Socket, Name) {
    let BuildBuffer = new Array;
    let BuildPath = Path ['join'] (Path ['resolve'] (), `Mcbbsmis/Config/${Name}.JSON`);
    let BuildData = Fs ['createReadStream'] (BuildPath);
    BuildData ['on'] ('data', Buffer => BuildBuffer ['push'] (new String (Buffer)));
    BuildData ['on'] ('end', () => {
        Deep (Socket, BuildBuffer)
    })
}
function Online (Socket, Url) {
    let BuildBuffer = new Array;
    Http ['get'] (Url, Response => {
        try {
        Response ['on'] ('data', Buffer => BuildBuffer ['push'] (new String (Buffer)))
        Response ['on'] ('end', () => Deep (BuildBuffer))
        } catch (E) {}
    })
}

function MainActivity (Socket, Mode, Path) {
    switch (Mode) {
        case 'Local':
            Local (Socket, Path);
        break;
        case 'Online':
            Online (Socket, Path);
        break;
    }
}

module ['exports'] = MainActivity;