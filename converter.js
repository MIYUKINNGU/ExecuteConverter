/**
 * executeを変換をします
 * @param {String} input 旧構文を入力してください。
 * @return {String} 新構文
*/
function conver(input) {
    let textlist = input.split(" ");
    console.log(textlist)
    let after = [];
    let dqcount = 0;
    let selector = false;
    let run = false;
    let poscount = 0;
    let selparam = false;
    let stack = [];
    let pushing = "";
    let endfunc = (function () {});
    let count = -1;
    textlist.forEach(function (elem){
        after.push(elem);
        if (selector) {
            [...elem].forEach(function (char){
                switch (char){
                    case "[":
                        stack.push("[");
                        break;
                    case '"':
                        console.log(stack[-1])
                        if (stack.slice(-1)[0] == '"') {
                            console.log("OK")
                            stack.pop();
                        }else {
                            stack.push('"');
                        }
                        break;
                    case "]":
                        stack.pop()
                        break;
                }
            });
            console.log(stack)
            if (stack.length == 0) {
                console.log("at @s positioned")
                after.push("at @s positioned");
                selector = false;
                run = true;
            }
        }else if (run) {
            if (elem.split(/\^|\~/).length-1 == 0) {
                poscount++
            }else {
                poscount += elem.split(/\^|\~/).length-1;
            }
            if (poscount > 2) {
                run = false;
                poscount = 0;
                after.push("run")
                endfunc();
            }
        }else if (elem.match(/\"/) || dqcount % 2 == 1){
            if ((elem.split(/\"/).length - 1) % 2 == 1 || dqcount % 2 == 1) {
                dqcount += elem.split(/\"/).length - 1;
            }
        }else if (elem == "execute") {
            after.push("as");
            selector = true;
        }else if (elem == "detect") {
            after.pop();
            after.push("execute if block");
            endfunc = (function () {
                after.pop();
                count = 2
            });
            run = true;
        }else if (elem == "testfor") {
            after.pop();
            after.push("execute if entity");
        }else if (elem == "testforblock") {
            after.pop();
            after.push("execute if block");
        }else if (elem == "testforblocks") {
            after.pop();
            after.push("execute if blocks");
        }
        if (count == 0) {
            after.push("run");
            count = -1;
        }
        console.log(count)
        console.log("------")
        count -= (count > 0)?1:0;
        console.log(count)
    });
    console.log(after)
    return after.join(' ').replace(/ run execute/g,"");
}

/*

Copyright(c)2022 MIYUKINNGU

*/