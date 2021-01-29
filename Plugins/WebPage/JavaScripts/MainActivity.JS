window ['addEventListener'] ('load', () => {
    if (!('WebSocket' in window))
    alert ('您的瀏覽器不支持WebSocket服務');
    else {
        try {
            const Server = new WebSocket ('ws://127.0.0.1:9239');
            Server ['addEventListener'] ('open', () => {
                document ['getElementById'] ('Submit') ['addEventListener'] ('click', () => {
                    alert ('發送了')
                Server ['send'] (document ['getElementById'] ('Content') ['value'])
                })
            })
        } catch (Err) {
            alert (Err)
        }
    } 
})