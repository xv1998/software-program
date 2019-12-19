const hidePhone=function(phone){
    let replace='****'
    console.log(phone)
    let pre=phone.substring(0,3)
    let last=phone.substring(7,11)
    let hidephone=pre+replace+last;
    console.log(hidephone)
    return hidephone
}
export {hidePhone}
