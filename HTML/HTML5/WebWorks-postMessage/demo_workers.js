let i=0;

const varFunc = () => {
    i=i+1;
    postMessage(i);
    setTimeout(varFunc,300);
}
varFunc();