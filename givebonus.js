//CMCT-论坛自定义散魔start
//按钮位置
let butt = document.querySelectorAll('.main tr .rowhead')
//获取用户ID
let uname = document.querySelectorAll('.medium')
let userid = uname[0].children[0].innerText
//用户回复楼元素获取
let selfuname = document.querySelectorAll('.embedded')
for (let i = 0; i < butt.length; i++) {
	butt[i].innerHTML = `
<td class="rowhead nowrap" valign="top" align="right">赠送魔力值</td>
<input class="sentip" style="margin-top: 5px; width: 50px;" type="text" value="">
<input class="sentsu" style="margin-top: 5px; width: 50px;" type="button" value="赠送"disabled>
`
let ids = (butt[i].nextElementSibling.children)
//let id = ids[0].id
//获取赠送ID
let id = ids[0].id.substring(9)
//赠送魔力元素
let bous = butt[i].children
let bousput = bous[0]
let boussub = bous[1]
boussub.style.color = 'blue'
//获取回复楼层用户ID
let funame = selfuname[2 * i + 5].children
let fidt = funame[2].innerText
let fidts = fidt.indexOf(' ')
let fid = fidt.substring(0, fidts)
//点击按钮定义
bousput.addEventListener('input', function(){
    boussub.disabled = false
})
boussub.addEventListener('click', function(){
   //console.log(id)
   let bousnum = +bousput.value
   if (isNaN(bousnum)) {
       alert('请重新输入赠送魔力数')
   }else {
       givebonus_post(id, bousnum, `确定赠送${bousnum}点魔力值吗`)
       boussub.disabled = true
       bousput.disabled = true
       boussub.value = '已赠'
       boussub.style.color = 'red'
   }
})
//一键散魔start
if (i === butt.length - 1){
 let idiv = document.createElement('div')
 let bsall = selfuname[3].appendChild(idiv)
 bsall.innerHTML = `
 <input class="sentipt" style="margin-top: 5px; width: 80px;" type="text" value=" ">
 <input class="sentsub" style="margin-top: 5px; width: 100px;" type="button" value="输入一键赠送值" disabled>
 `
 let sentipt = bsall.children[0]
 let sentsub = bsall.children[1]
 sentipt.addEventListener('input', function(){
   let putnum = document.querySelectorAll('.sentip')
      let numsent = +sentipt.value
      sentsub.value = '一键赠送'
      sentsub.disabled = false
   for (let k = 0; k < putnum.length; k++ ) {
        putnum[k].value = numsent
     }
 })
 sentsub.addEventListener('click',function(){
     if (isNaN(+sentipt.value)) {
     alert('请重新输入赠送魔力数')
   }else {
       let confirmtext = sentipt.value
       if (confirm(`你确定要当前页面的每层送出${confirmtext}点魔力值？`)){
     for (let p = butt.length-1; p > -1; p--) {
         //console.log(butt[p].children[1])
         butt[p].children[1].click()
         sentsub.disabled = true
         sentipt.disabled = true
         sentsub.value = '已赠'
     }
       }
       }
 } )
}
//一键散魔end
//检测若已增送或为自己楼层不可赠送
for (let j = 0; j < ids.length; j++) {
if (ids[j].innerText === userid || fid === userid){
  boussub.disabled = true
  bousput.disabled = true
  boussub.style.color = 'red'
  boussub.value = '禁止'
  bousput.value = userid
  }
}
}
//CMCT-论坛自定义散魔end
//**********分割线***************//
//种子界面送魔力start
//定义按钮位置
let bonusbutton = document.querySelector('.outer table tr .rowfollow #bonusbutton')
//创建span标签按钮
let input = document.createElement('span')
bonusbutton.appendChild(input)
input.innerHTML = `
<input class="torrentput" style="margin-top: 5px; width: 50px;" type="text" value="">
<input class="torrentsub" style="margin-top: 5px; width: 50px; color: blue;" type="button" value="赠送"disabled>
`
//获取种子ID
let torrenthref = document.querySelector('.index')
let ttid = torrenthref.href.substring(torrenthref.href.indexOf('=') + 1)
let torrentput = document.querySelector('.torrentput')
let torrentsub = document.querySelector('.torrentsub')
torrentput.addEventListener('input', function(){
    torrentsub.disabled = false
})
torrentsub.addEventListener('click', function(){
	let bonusnum = +torrentput.value
	if (isNaN(bonusnum)) {
     alert('请重新输入赠送魔力数')
   }else {
	givebonus(ttid, bonusnum, `你确定赠送${bonusnum}个魔力值吗？`)
	saythanks(ttid)
	}
})
//种子界面送魔力end

//取自CMCT官方魔力函数
function givebonus_post(postid, bonus, confirmtxt) {
        $.post("bonus.php", { "id": postid, "bonus": bonus, "type": "post" }, function () {
        $("#bonusbutton" + postid).hide();
        $("#nobonus" + postid).hide();
        var mynameSpan = $('#myname' + postid);
        var nameHTML = mynameSpan.html().trim() + "(" + bonus + ") ";
        mynameSpan.html(nameHTML);
        mynameSpan.css('display', 'inline');
        $('#bonustips' + postid).hide();
        $('#bonussum' + postid).text(Number($('#bonussum' + postid).text()) + bonus);
        });

}
function givebonus(torrentid, bonus, confirmtxt) {
        $.post("bonus.php", { "id": torrentid, "bonus": bonus }, function () {
        document.getElementById("bonusbutton").innerHTML = document.getElementById("bonusgiven").innerHTML;
        document.getElementById("nobonus").innerHTML = document.getElementById("myname").innerHTML;
        });

}
