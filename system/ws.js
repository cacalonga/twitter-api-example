var wss = require('ws');

module.exports.webSocket = function (server) {
    var s = new wss.Server({ server });
    var lst = [];

    s.on("connection", function (ws) {

        ws.on("message", function (message) {

            message = JSON.parse(message);

            if (message.type === "name") {
                ws.personName = message.data;
                var ld = message.data + " - "
                lst.push(ld);
                s.clients.forEach(function e(client) {
                    if (client != ws) {
                        client.send(JSON.stringify({
                            name: "user joined ----> ",
                            data: message.data,
                        }));
                    }
                })
                console.log(lst);
                return;
            }

            console.log("alınan mesaj : " + message.data);

            s.clients.forEach(function e(client) {
                if (client != ws) {
                    client.send(JSON.stringify({
                        name: ws.personName,
                        data: message.data
                    }));
                }
            })

        })
        ws.on("close", function () {
            console.log("client onclose");
        })
    })
}