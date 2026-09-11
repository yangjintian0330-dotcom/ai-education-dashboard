/* School-scoped deterministic demo. No backend data or live model inference. */
(function (global) {
  'use strict';
  const names = ['北京市第四中学','北京市第八中学','北京市第三十五中学','北京市第三十五中学(初中)','北京市第一六一中学','北京市第十五中学','北京市第十四中学','北京市第十三中学','北京市第六十六中学','北京市第三十一中学','北京市第三中学','北京市第一五六中学','北京市第三十九中学','北京市第四十四中学','北京市第一五九中学','北京师范大学附属实验中学','北京师范大学第二附属中学','北京市第四十三中学','北京市三帆中学','北京市回民学校','北京市铁路第二中学','北京市西城外国语学校','北京市月坛中学'];
  const taxonomy = {
    '语文':[['阅读理解',['整本书阅读','人物关系','原文证据']],['写作表达',['细节描写','说明文','修改反馈']],['文学赏析',['古诗词意象','诗词闯关','创意表达']]],
    '数学':[['概念探究',['一次函数','几何变换','参数变化']],['练习巩固',['分层题单','错因辨析','解题步骤']],['情境建模',['生活计费','统计概率','方案比较']]],
    '英语':[['情境表达',['校园问路','角色对话','口语练习']],['语言积累',['词汇游戏','语法辨析','阅读理解']],['写作训练',['句式练习','段落组织','表达反馈']]],
    '物理':[['实验探究',['串并联电路','变量控制','现象对比']],['概念演示',['运动与力','光学现象','能量转化']],['练习反馈',['受力分析','电路判断','实验题解析']]],
    '化学':[['实验教学',['装置识别','操作步骤','现象观察']],['概念理解',['物质组成','化学反应','微观模型']],['应用练习',['方程式配平','物质鉴别','实验推理']]],
    '生物':[['生命结构',['细胞模型','器官系统','结构与功能']],['生命过程',['光合作用','遗传规律','生态循环']],['探究实践',['实验设计','观察记录','数据解释']]],
    '历史':[['时序梳理',['历史时间线','事件关联','阶段特征']],['史料研读',['材料辨析','证据提取','多视角解释']],['主题探究',['文明交流','制度变迁','历史情境']]],
    '地理':[['空间认知',['地图判读','经纬定位','区域比较']],['自然过程',['天气气候','地形变化','水循环']],['人地关系',['人口城市','资源利用','环境议题']]],
    '信息科技':[['人工智能',['智能体设计','神经网络','AI发展历程']],['计算思维',['算法演示','编程练习','逻辑闯关']],['数字素养',['信息检索','数据表达','安全伦理']]],
    '通用／管理':[['班级事务',['日常待办','活动安排','班级记录']],['课堂组织',['大屏互动','分组回答','即时回应']],['教学管理',['成绩整理','进度记录','反馈汇总']]],
    '跨学科':[['项目学习',['真实问题','任务分工','成果展示']],['综合探究',['科学与艺术','数学与生活','人文与技术']],['过程评价',['学习档案','同伴互评','反思记录']]]
  };
  const abilities=['教学动画','教育应用','教学游戏','互动课件','数据回收','AI命题','AI教案·大单元','AI组题','作文学情分析','作业学情分析','知识库分析'];
  const subjects=Object.keys(taxonomy);
  const palette=['#35c5ee','#a48afa','#2ed0b1','#f1c65c','#ee8d9c','#6898ef','#c4c966','#ed9b57','#d58ee5','#8bc8a7','#72d8da'];
  const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const hash=value=>Array.from(value).reduce((h,c)=>(Math.imul(h,31)+c.charCodeAt(0))>>>0,7);
  const dateString=date=>date.toISOString().slice(0,10);
  const dayOffset=(day,offset)=>dateString(new Date(new Date(day+'T12:00:00Z').getTime()+offset*86400000));
  const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
  function validDate(day){return /^\d{4}-\d{2}-\d{2}$/.test(day)&&Number.isFinite(Date.parse(day))&&dateString(new Date(day))===day;}
  const lessons={
    '语文':{topic:'把一件事写具体',stage:'课堂导入与表达练习',direction:'比较不同写法，并借助观察提示支持学生独立表达。',need:'做一份写作课件，先让学生比较“我很紧张”和具体动作描写，再自己写。',change:'不要直接给完整范文。示例语言要贴近学生，删去过于成熟的比喻，保留三个观察提示。',judgment:'教师通过示例难度和提示方式的调整，保留学生独立表达空间。',cover:2},
    '数学':{topic:'一次函数参数探究',stage:'概念探究与练习巩固',direction:'通过参数控制、图像观察和辨析练习区分易混概念。',need:'做一次函数互动课件，让学生拖动 k 和 b 观察直线变化。',change:'不要两个参数一起动。先固定 b 改 k，再固定 k 改 b；先预测再操作，答案点击后显示。',judgment:'教师明确控制变量的顺序和答案展示时机，而非仅接受自动演示。',cover:null},
    '英语':{topic:'校园问路互动游戏',stage:'情境表达与分组练习',direction:'用校园情境、分组回答与方向词提示组织语言练习。',need:'设计校园问路游戏，练习 Where is 和 How can I get to。',change:'投屏用，三组轮流回答；不要计时，答错先给方向词提示，不要立刻公布答案。',judgment:'教师结合设备与组织条件，将个人游戏调整为课堂分组任务。',cover:4},
    '物理':{topic:'串并联开关与灯泡',stage:'课堂讲解与现象对比',direction:'通过开关位置与灯泡状态对照，呈现电路条件。',need:'做串并联电路动画，展示断开一个开关时灯泡的变化。',change:'并联必须区分干路和支路开关，不能都说灯泡全灭；标明开关位置，让动画与解释逐项对应。',judgment:'教师指出条件缺失并要求核对动画和解释，体现学科内容审查。',cover:null},
    '化学':{topic:'实验装置与操作顺序',stage:'实验预习与步骤讲解',direction:'以装置识别和操作顺序为线索组织实验学习材料。',need:'制作实验装置的分步演示，帮助学生辨认仪器和连接顺序。',change:'别自动播放全部步骤，先让学生判断下一步，并保留安全注意事项。',judgment:'教师要求分步判断和安全提醒，强调实验材料的教学适用条件。',cover:7},
    '生物':{topic:'细胞结构可视化',stage:'概念讲解与结构辨识',direction:'通过结构标注和观察问题，帮助学生辨认细胞组成。',need:'制作细胞结构互动图，点击能看见各部分名称。',change:'先隐藏名称让学生判断，再显示解释；动植物细胞分开展示，不要混用结构。',judgment:'教师通过分类核对和提示顺序控制，避免概念混淆。',cover:null},
    '历史':{topic:'史料与事件时间线',stage:'史料研读与证据讨论',direction:'结合事件时序与史料定位，引导学生解释证据。',need:'做一个历史时间线，让学生按事件查看对应史料。',change:'不要编造引文，原文和出处分开；先让学生解释，再呈现讨论提示。',judgment:'教师要求史料来源可追溯，并保留学生解释过程。',cover:null},
    '地理':{topic:'天气变化观察',stage:'地图判读与探究活动',direction:'围绕天气材料和空间分布，引导学生观察与解释。',need:'制作天气变化的互动材料，让学生观察气温与降水。',change:'把观察和解释分开，坐标单位写清楚，不要把一次天气现象说成气候规律。',judgment:'教师关注数据标注和结论边界，对材料进行专业判断。',cover:null},
    '信息科技':{topic:'AI 智能体工坊',stage:'任务实践与模型理解',direction:'通过角色设定、测试与反馈，理解智能体的工作方式。',need:'设计智能体学习工坊，让学生设置角色并测试回答。',change:'不要只展示成功回答，增加错误案例，让学生比较调整前后的结果。',judgment:'教师把结果展示转向测试与比较，关注学生对工具局限的理解。',cover:1},
    '通用／管理':{topic:'班级事务管理系统',stage:'班级管理与课堂组织',direction:'围绕事务记录、分组回应和反馈整理减少重复准备。',need:'制作班级事务管理工具，整理待办和活动安排。',change:'展示页不放学生手机号，名单只保留必要字段，完成事项可撤回。',judgment:'教师提出信息最小化和可撤回要求，关注管理工具的使用边界。',cover:0},
    '跨学科':{topic:'校园低碳调查',stage:'项目探究与成果交流',direction:'将数据收集、方案比较与成果表达组织为项目任务。',need:'做校园低碳调查任务单，记录数据并比较改进方案。',change:'先写清采样范围和单位，不要直接给“最佳方案”，让各组说明选择依据。',judgment:'教师要求结论有数据依据，并让学生自行作出方案判断。',cover:null}
  };
  function createSchool(rawName,anchor=today()){
    if(!validDate(anchor))throw new Error('无效的数据日期');
    const name=String(rawName||'北京市第四中学').normalize('NFKC').trim().slice(0,80)||'北京市第四中学';
    const known=names.includes(name),seed=hash(name),id='school-'+seed;
    const data={id,name,known,anchor,totalTeachers:known?56+seed%41:0,teachers:[],records:[],cases:[]};
    if(!known)return data;
    const surnames=['王','李','张','刘','陈','赵','孙','周','吴','郑','许','朱','杨','黄','林','何','高','马','罗','梁','宋','唐'];
    data.teachers=Array.from({length:22},(_,i)=>({id:id+'-teacher-'+i,schoolId:id,name:surnames[(i+seed%7)%surnames.length]+'老师',subject:subjects[i%subjects.length],grade:['七年级','八年级','九年级','高一','高二','高三'][i%6]}));
    for(const [i,t] of data.teachers.entries())for(let d=0;d<28;d++){
      if((i+d+seed)%5===0)continue;
      const l=lessons[t.subject],abilityIndex=(i+d+seed)%abilities.length;
      // Optional essay/homework analysis is not fabricated when unavailable for a school.
      if((abilityIndex===8||abilityIndex===9)&&seed%2===0)continue;
      const ability=abilities[abilityIndex],date=dayOffset(anchor,-d),rid=id+'-work-'+i+'-'+d;
      const file=d%3===0?[{id:rid+'-file',name:l.topic+'.html',sections:[['教学任务',l.direction],['课堂组织',l.change],['设计记录','根据教师需求整理的静态演示预览，非实际导出文件。']]}]:[];
      data.records.push({id:rid,schoolId:id,teacherId:t.id,teacher:t.name,subject:t.subject,grade:t.grade,date,ability,title:l.topic,assetType:ability==='教育应用'||ability==='教学游戏'?'教学应用':ability==='知识库分析'?'知识库':ability==='AI组题'||ability==='AI命题'?'题库':'教学资源',work:3+(seed+i*3+d)%19,turns:6+(seed+i*7+d*3)%37,views:10+(seed+i*11+d*7)%180,favorites:1+(seed+i*3+d)%24,stage:l.stage,direction:l.direction,judgment:l.judgment,messages:[['教师','飞象老师，面向'+t.grade+'，'+l.need],['AI','可以先生成基础方案，加入展示与自动反馈。'],['教师',l.change],['AI','收到，将按你的要求调整内容与呈现步骤，并保留可修改的部分。'],['教师','请保留这个版本，我会在使用前再检查内容和操作。']],files:file});
    }
    const caseSubjects=['通用／管理','信息科技','语文','信息科技','英语','语文','语文','化学','语文','通用／管理','通用／管理','信息科技'];
    const caseTitles=['班级事务管理系统','AI 智能体工坊','熊猫竹博士 · 说明文诊室','人工智能史诗之旅','数字人对话智能体','红楼梦人物知识图谱','作文成长助手','手绘化学实验演示','文学中的月亮','大屏与手机同步打字','教师个人成绩系统','神经网络可视化'];
    const casePurposes=['整理班级待办与活动安排，支持日常事务管理。','通过角色设定与测试，理解智能体的工作方式。','通过观察提示与修改建议，练习把事物说明清楚。','串联人工智能发展的事件，引导学生比较技术变化。','用角色化对话提供校园情境中的口语练习。','整理人物关系与原文证据，支持整本书阅读。','记录作文反馈与修改过程，支持持续改进表达。','分步辨认实验装置和操作顺序，辅助实验预习。','结合诗句与月亮意象，引导学生观察和表达。','将学生输入同步到课堂大屏，汇集分组回应。','整理成绩变化与知识点表现，辅助教师反馈。','通过手写数字识别，观察神经网络中的信息传递。'];
    const caseChanges=['不要放学生手机号，只保留必要字段，完成事项允许撤回。','增加回答不准确的测试案例，让学生比较修改前后的结果。','不要直接给完整范文，用问题引导学生补充观察。','标清事件时间和材料来源，不编造人物引言。','使用学生学过的词汇，答错时先提示，不直接替学生回答。','先记录原文和章节，再由学生解释；不要自动编写人物结论。','反馈要定位到原句，修改前后保留对照，别替学生重写全文。','保留安全提示，学生先判断下一步，教师再点击展开。','诗句标明作者与篇名，给学生保留自己的联想记录。','投屏只显示小组名称，不展示学生个人联系方式。','不要用一个总分评价学生，把知识点表现和变化分开。','把输入、隐藏层和输出分开，让学生看清每一步变化。'];
    caseSubjects.forEach((subject,i)=>{
      if((seed+i)%7===0)return;
      const own=data.records.filter(r=>r.subject===subject&&r.date>=dayOffset(anchor,-6)),base=own[(seed+i*3)%own.length];if(!base)return;
      const rid=id+'-curated-'+i,title=caseTitles[i],record={...base,id:rid,title,ability:'教育应用',assetType:'教学应用',direction:casePurposes[i],messages:[['教师','飞象老师，帮我制作“'+title+'”。'+casePurposes[i]],['AI','可以先组织内容与交互流程，生成可修改的应用方案。'],['教师',caseChanges[i]],['AI','收到，按这些要求调整，并保留教师检查和修改的环节。']],files:i%3===0?[]:[{id:rid+'-file',name:title+'.html',sections:[['教学用途',casePurposes[i]],['教师调整',caseChanges[i]],['文件说明','此处为根据模拟对话整理的静态预览，不是真实导出文件。']]}]};
      record.stage=['班级管理与课堂组织','任务实践与模型理解','表达练习与反馈修改','主题阅读与比较讨论','情境表达与分组练习','整本书阅读与证据讨论','写作反馈与修改','实验预习与步骤讲解','诗歌阅读与表达','课堂回应与反馈','评价整理与反馈','模型观察与探究'][i];
      record.judgment='在“'+title+'”的对话中，教师提出：'+caseChanges[i];
      data.records.push(record);
      data.cases.push({id:id+'-case-'+i,schoolId:id,teacherId:record.teacherId,teacher:record.teacher,subject,grade:record.grade,date:record.date,title,cover:i,purpose:casePurposes[i],recordId:record.id});
    });
    return data;
  }
  function selectRecords(data,filters){
    if(!validDate(filters.start)||!validDate(filters.end)||filters.start>filters.end)throw new Error('请选择有效的起止日期，开始日期不能晚于结束日期。');
    return data.records.filter(r=>r.schoolId===data.id&&r.date>=filters.start&&r.date<=filters.end&&(!filters.grade||r.grade===filters.grade)&&(!filters.subject||r.subject===filters.subject));
  }
  function sumBy(records,key,value){const groups=new Map();for(const r of records){const k=typeof key==='function'?key(r):r[key];groups.set(k,(groups.get(k)||0)+(value?r[value]:1));}return Array.from(groups,([name,value])=>({name,value})).sort((a,b)=>b.value-a.value||a.name.localeCompare(b.name,'zh'));}
  function summarize(data,records){
    const safe=records.filter(r=>r.schoolId===data.id),ranking=data.teachers.map(t=>{const own=safe.filter(r=>r.teacherId===t.id);return {...t,generated:own.length,work:own.reduce((n,r)=>n+r.work,0),turns:own.reduce((n,r)=>n+r.turns,0),views:own.reduce((n,r)=>n+r.views,0),favorites:own.reduce((n,r)=>n+r.favorites,0)};}).filter(t=>t.generated);
    return {teachers:ranking.length,coverage:data.totalTeachers?ranking.length/data.totalTeachers*100:0,work:safe.reduce((n,r)=>n+r.work,0),turns:safe.reduce((n,r)=>n+r.turns,0),assets:safe.length,capabilities:sumBy(safe,'ability','work'),assetTypes:sumBy(safe,'assetType'),matrix:sumBy(safe,r=>r.grade+'|'+r.subject,'work'),ranking:ranking.sort((a,b)=>b.generated-a.generated||a.id.localeCompare(b.id))};
  }
  function analyze(data,records){
    const safe=records.filter(r=>r.schoolId===data.id);if(!safe.length)return null;
    const groups=sumBy(safe,'subject').slice(0,3),topics=groups.map(g=>{const own=safe.filter(r=>r.subject===g.name),direction=sumBy(own,'direction')[0].name;return own.find(r=>r.direction===direction);});
    return {content:groups.map((g,i)=>g.name+'：'+topics[i].direction).join(''),stages:'对话中的预期用途主要涉及'+Array.from(new Set(topics.map(l=>l.stage))).join('、')+'。这些要求体现教师对学习活动组织的设计意图，不代表资源已经在课堂使用。',collaboration:topics.map(l=>l.judgment).join('')+'对话中的最后确认仍保留教师检查环节，不能仅凭生成完成判断内容已经核验。',related:groups.slice(0,2).map(g=>safe.find(r=>r.subject===g.name))};
  }
  function dialogMarkup(data,id){
    const r=data.records.find(r=>r.id===id&&r.schoolId===data.id);if(!r)return null;
    return '<header class="dialog-head"><div><h2 id="dialog-title">'+escape(r.title)+'</h2><p>'+escape(r.teacher+' · '+data.name+' · '+r.grade+r.subject)+' · 只读模拟记录</p></div><button type="button" data-close>关闭</button></header><div class="dialog-body"><section class="transcript" aria-label="完整对话记录"><div class="transcript-heading">对话记录 <span>'+r.messages.length+' 条</span></div>'+r.messages.map(([role,text],i)=>'<article class="message '+(role==='教师'?'teacher':'assistant')+'"><b>'+escape(role==='教师'?r.teacher:'飞象老师')+'<small>'+String(i+1).padStart(2,'0')+'</small></b><p>'+escape(text)+'</p></article>').join('')+(r.files.length?'<section class="file-list"><h3>关联演示文件</h3>'+r.files.map(f=>'<button type="button" data-file="'+escape(f.id)+'" aria-expanded="false" aria-controls="file-preview"><span>HTML</span><b>'+escape(f.name)+'</b><em>查看 →</em></button>').join('')+'</section>':'')+'</section><section id="file-preview" hidden><div class="file-head"><h3>文件预览</h3><button type="button" data-back>返回对话</button></div><div class="file-document"></div></section></div>';
  }
  const api={names,taxonomy,abilities,palette,escape,createSchool,selectRecords,summarize,analyze,dialogMarkup,validDate,today,dayOffset,sumBy};
  global.SchoolWorkspace=api;
  if(typeof document==='undefined')return;
  // Browser UI uses exactly the same scoped data and aggregation functions as Node checks.
  function mount(){
    const $=s=>document.querySelector(s),fmt=n=>Number(n).toLocaleString('zh-CN');
    const data=createSchool(new URLSearchParams(location.search).get('school'));
    let filters={start:dayOffset(data.anchor,-6),end:data.anchor,grade:'',subject:''},active='overview',selectedSubject='语文',sort='generated',focusReturn=null,previewRecord=null;
    const rankingPages={turns:0,work:0};let capabilityPage=0;
    let recentRows=[],recentIndex=0,recentHovered=false,recentFocused=false;
    const recentList=$('#recent-work'),reducedMotion=global.matchMedia?.('(prefers-reduced-motion: reduce)');
    recentList.onmouseenter=()=>{recentHovered=true;};recentList.onmouseleave=()=>{recentHovered=false;};
    recentList.onfocusin=()=>{recentFocused=true;};recentList.onfocusout=e=>{recentFocused=!!e.relatedTarget&&e.relatedTarget.closest('#recent-work')===recentList;};
    function renderRecent(animate=false){
      const previous=new Map(Array.from(recentList.children,row=>[row,row.getBoundingClientRect()]));
      const makeRow=r=>{const row=document.createElement('button');row.setAttribute('type','button');row.dataset.record=r.id;row.setAttribute('title',r.title);row.innerHTML='<span>'+escape(r.teacher)+' · '+r.subject+'</span><b>'+escape(r.title)+'</b><small>'+r.date+' ↗</small>';return row;};
      if(!animate){recentList.replaceChildren(...recentRows.slice(0,5).map(makeRow));if(!recentRows.length)recentList.innerHTML='<p class="empty">当前时间范围暂无创作记录</p>';}
      else{
        const row=makeRow(recentRows[(recentIndex+4)%recentRows.length]);
        recentList.replaceChildren(...Array.from(recentList.children).slice(1),row);
        Array.from(recentList.children).forEach(item=>{
          const before=previous.get(item),after=item.getBoundingClientRect();
          if(!before)item.animate?.([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.2,.75,.25,1)',fill:'both'});
          else if(before.top!==after.top)item.animate?.([{transform:'translateY('+(before.top-after.top)+'px)'},{transform:'translateY(0)'}],{duration:680,easing:'cubic-bezier(.2,.72,.25,1)',fill:'both'});
        });
      }
      bindRecords(recentList);
    }
    $('#school-name').textContent=data.name;document.title=data.name+' · 飞象老师驾驶舱';
    $('#date-start').value=filters.start;$('#date-end').value=filters.end;
    if(!data.known){$('#school-warning').hidden=false;$('#school-warning').textContent='尚未配置该学校的数据，请从区域驾驶舱选择学校进入。';}
    const overview=()=>selectRecords(data,{...filters,grade:'',subject:''});
    const research=()=>selectRecords(data,filters);
    function activate(view,focus=false){active=view;document.querySelectorAll('[data-tab]').forEach(b=>{const on=b.dataset.tab===view;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;if(on&&focus)b.focus();});document.querySelectorAll('[data-view]').forEach(p=>p.hidden=p.dataset.view!==view);$('#school-metrics').hidden=view!=='overview';}
    const tabs=Array.from(document.querySelectorAll('[data-tab]'));
    tabs.forEach((b,i)=>{b.onclick=()=>activate(b.dataset.tab);b.onkeydown=e=>{const index=e.key==='ArrowRight'?(i+1)%3:e.key==='ArrowLeft'?(i+2)%3:e.key==='Home'?0:e.key==='End'?2:null;if(index!==null){e.preventDefault();activate(tabs[index].dataset.tab,true);}};});
    $('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('#page-status').textContent='当前浏览器不支持全屏，请使用浏览器全屏功能。';}};
    function pie(target,rows,total,label,page=0){
      let angle=-Math.PI/2;const paths=rows.map((r,i)=>{const a=angle;angle+=total?r.value/total*Math.PI*2:0;return '<path fill="'+palette[i%palette.length]+'" d="M100 100 L'+(100+94*Math.cos(a))+' '+(100+94*Math.sin(a))+' A94 94 0 '+(angle-a>Math.PI?1:0)+' 1 '+(100+94*Math.cos(angle))+' '+(100+94*Math.sin(angle))+' Z"><title>'+escape(r.name)+'：'+r.value+'</title></path>';}).join('');
      const shape=rows.length===1?'<circle cx="100" cy="100" r="94" fill="'+palette[0]+'"/>':paths;
      target.innerHTML='<div class="pie-summary"><svg viewBox="0 0 200 200" role="img" aria-label="'+label+'">'+(total?shape:'<circle cx="100" cy="100" r="94" fill="#25364d"/>')+'</svg><div><strong>'+fmt(total)+'</strong><span>'+label+'</span></div></div><div class="pie-legend">'+rows.slice(page*5,page*5+5).map((r,j)=>'<div><i style="background:'+palette[(page*5+j)%palette.length]+'"></i><span>'+escape(r.name)+'</span><b>'+fmt(r.value)+'</b><small>'+(r.value/total*100).toFixed(1)+'%</small></div>').join('')+(!rows.length?'<p class="empty">所选时间暂无记录</p>':'')+'</div>';
    }
    function pager(target,page,pages,action){target.innerHTML='<button type="button" aria-label="上一页" '+(page===0?'disabled':'')+'>‹</button><span>'+(page+1)+' / '+pages+'</span><button type="button" aria-label="下一页" '+(page>=pages-1?'disabled':'')+'>›</button>';target.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>action(page+(i?1:-1)));}
    function ranking(key,rows){const sorted=rows.slice().sort((a,b)=>b[key]-a[key]||a.id.localeCompare(b.id)),pages=Math.max(1,Math.ceil(sorted.length/5));rankingPages[key]=Math.min(rankingPages[key],pages-1);const offset=rankingPages[key]*5;
      $('#rank-'+key).innerHTML=sorted.slice(offset,offset+5).map((t,i)=>'<div class="rank-row"><span class="rank-index '+(offset+i<3?'medal':'')+'">'+String(offset+i+1).padStart(2,'0')+'</span><div><b>'+escape(t.name)+'</b><small>'+t.grade+' · '+t.subject+'</small></div><strong>'+fmt(t[key])+'<small>'+(key==='turns'?'轮':'次')+'</small></strong></div>').join('')||'<p class="empty">暂无记录</p>';
      pager($('#pager-'+key),rankingPages[key],pages,p=>{rankingPages[key]=p;ranking(key,rows);});
    }
    function renderOverview(){const rows=overview(),s=summarize(data,rows);
      $('#metric-teachers').textContent=fmt(s.teachers);$('#metric-coverage').textContent=s.coverage.toFixed(1)+'%';$('#teacher-denominator').textContent=fmt(data.totalTeachers);
      $('#metric-work').textContent=fmt(s.work);$('#metric-turns').textContent=fmt(s.turns);$('#metric-assets').textContent=fmt(s.assets);
      $('#metric-average').textContent=s.teachers?fmt(Math.round(s.turns/s.teachers)):0;
      const pages=Math.max(1,Math.ceil(s.capabilities.length/5));capabilityPage=Math.min(capabilityPage,pages-1);
      pie($('#ability-chart'),s.capabilities,s.work,'能力使用总次数',capabilityPage);pager($('#ability-pager'),capabilityPage,pages,p=>{capabilityPage=p;renderOverview();});
      pie($('#asset-chart'),s.assetTypes,s.assets,'资产总量（项）');ranking('turns',s.ranking);ranking('work',s.ranking);
      const grades=['七年级','八年级','九年级','高一','高二','高三'],academic=subjects.filter(s=>!['通用／管理','跨学科'].includes(s)),max=Math.max(1,...s.matrix.map(c=>c.value));
      $('#usage-matrix').innerHTML='<thead><tr><th scope="col">年级</th>'+academic.map(x=>'<th scope="col">'+x+'</th>').join('')+'</tr></thead><tbody>'+grades.map(g=>'<tr><th scope="row">'+g+'</th>'+academic.map(sub=>{const value=s.matrix.find(m=>m.name===g+'|'+sub)?.value||0;return '<td style="--intensity:'+(value?(.12+value/max*.64):0)+'" title="'+g+sub+'：'+value+' 次">'+(value?fmt(value):'—')+'</td>';}).join('')+'</tr>').join('')+'</tbody>';
      const special=s.matrix.filter(c=>c.name.endsWith('|通用／管理')||c.name.endsWith('|跨学科')).reduce((n,c)=>n+c.value,0);
      $('#matrix-caption').textContent='辅助老师工作次数 · 通用／管理及跨学科 '+fmt(special)+' 次';
      recentRows=rows.slice().sort((a,b)=>b.date.localeCompare(a.date));recentIndex=0;renderRecent();
    }
    function relatedLinks(rows){return rows.map(r=>'<button type="button" class="related-link" data-record="'+r.id+'"><b>'+escape(r.title)+' ↗</b><span>'+escape(r.teacher)+' · '+r.grade+' · '+r.subject+'</span></button>').join('');}
    // dialogue-pies:start
    function dialoguePieGroups(sessions){
      const directions=[['互动探究资源',/互动|拖动|探究|动画|游戏|滑块/],['练习与分层资源',/组题|题单|练习单|分层|八道题/],['表达与阅读资源',/写作|作文|阅读|原文|诗句|表达/],['评价反馈资源',/评价|成绩|反馈|学情/],['教学准备资源',/教案|备课|课件|教学设计/],['组织管理资源',/管理|班级|事务|分组/],['其他创作需求',null]];
      const stages=[['练习巩固',/课后|巩固|组题|题单|练习单|八道题/],['课堂导入',/导入|先放|比一比/],['探究与研讨',/探究|预测|拖动|滑块|追问|证据|解释/],['表达与实践',/写作|游戏|问路|表达|实验|学生自己/],['评价与反馈',/评价|成绩|反馈|修改/],['教学准备与组织',null]];
      const colors=['#a9c9f5','#ffe6a4','#f9c2db','#a9e1de','#b4e9c8','#ffcda9','#c9c4e8'];
      const texts=sessions.map(messages=>messages.filter(m=>m[0]==='教师').map(m=>m[1]).join('。'));
      return [directions,stages].map(catalog=>{const rows=catalog.map(([name],i)=>({name,value:0,color:colors[i]}));texts.forEach(text=>{const i=catalog.findIndex(([,rule])=>!rule||rule.test(text));rows[i].value++;});return rows.filter(r=>r.value);});
    }
    function dialoguePies(sessions){
      if(!sessions.length)return '<div class="empty rv-empty">当前筛选下暂无创作对话</div>';
      const groups=dialoguePieGroups(sessions),total=sessions.length;
      const css='<style>.dialogue-pies{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;width:100%;min-width:0}.dialogue-pie{min-width:0;margin:0}.dialogue-pie h4{font-size:16px!important;line-height:1.5!important;color:#e4efff!important;margin:0 0 10px!important}.dialogue-pie svg{display:block;width:100%;height:clamp(100px,17vh,170px);margin:0 auto 10px}.dialogue-pie text{fill:#26394e;font:10px sans-serif;text-anchor:middle;dominant-baseline:middle}.dialogue-pie ul{list-style:none;padding:0;margin:0}.dialogue-pie li{display:grid;grid-template-columns:6px minmax(0,1fr) auto;gap:6px;align-items:center;padding:5px 0;border-bottom:1px solid #41617b33;font-size:11px;line-height:1.4;color:#abc2db}.dialogue-pie li i{width:6px;height:6px;border-radius:2px}.dialogue-pie li b{font-weight:500;color:#d4e5f6;font-size:10px;white-space:nowrap}.collaboration-caption{display:flex;justify-content:space-between;gap:8px;color:#8cd9e4;font-size:12px;margin:14px 0 6px}.collaboration-caption small{font-size:10px;color:#91a8c3}@media(max-width:620px){.dialogue-pies{grid-template-columns:1fr}.dialogue-pie svg{height:160px}}</style>';
      return css+'<div class="dialogue-pies">'+groups.map((rows,index)=>{
        let angle=-Math.PI/2;
        const paths=rows.map(row=>{const start=angle;angle+=row.value/total*Math.PI*2;const mid=(angle+start)/2,pct=(row.value/total*100).toFixed(1),title=row.name+'：'+row.value+' 次对话 · '+pct+'%';
          const d='M100 100 L'+(100+94*Math.cos(start))+' '+(100+94*Math.sin(start))+' A94 94 0 '+(angle-start>Math.PI?1:0)+' 1 '+(100+94*Math.cos(angle))+' '+(100+94*Math.sin(angle))+' Z';
          return (rows.length===1?'<circle cx="100" cy="100" r="94" fill="'+row.color+'"><title>'+title+'</title></circle>':'<path d="'+d+'" fill="'+row.color+'"><title>'+title+'</title></path>')+'<text x="'+(rows.length===1?100:100+60*Math.cos(mid))+'" y="'+(rows.length===1?100:100+60*Math.sin(mid))+'">'+Math.round(row.value/total*100)+'%</text>';
        }).join('');
        return '<figure class="dialogue-pie"><h4>'+['创作方向','教学环节支持方向'][index]+'</h4><svg viewBox="0 0 200 200" role="img" aria-label="'+['创作方向','教学环节支持方向'][index]+'，共'+total+'次对话">'+paths+'</svg><ul>'+rows.map(row=>'<li><i style="background:'+row.color+'"></i><span>'+row.name+'</span><b>'+row.value+' 次 · '+(row.value/total*100).toFixed(1)+'%</b></li>').join('')+'</ul></figure>';
      }).join('')+'</div>';
    }
    // dialogue-pies:end
    function renderResearch(){const rows=research(),summary=summarize(data,rows),a=analyze(data,rows);const ranking=summary.ranking.slice().sort((x,y)=>y[sort]-x[sort]||x.id.localeCompare(y.id)).slice(0,10);
      $('#teacher-table-body').innerHTML=ranking.map((r,i)=>'<tr><td>'+String(i+1).padStart(2,'0')+'</td><td>'+escape(r.name)+'</td><td>'+r.subject+'<small>'+r.grade+'</small></td><td>'+fmt(r.generated)+'</td><td>'+fmt(r.views)+'</td><td>'+fmt(r.favorites)+'</td></tr>').join('')||'<tr><td colspan="6" class="empty">当前筛选下暂无教师创作</td></tr>';
      $('#content-analysis').innerHTML=dialoguePies(rows.map(r=>r.messages));
      $('#collaboration-analysis').innerHTML=a?'<h4>教师通过明确要求保留教学判断</h4><p>'+escape(a.collaboration)+'</p><div class="collaboration-caption"><b>优秀协同案例</b><small>点击查看对话过程 ↗</small></div>'+relatedLinks(a.related):'<p class="empty">当前筛选下暂无协同分析</p>';
      $('#filter-summary').textContent=(filters.grade||'全部年级')+' · '+(filters.subject||'全部学科');
      bindRecords($('#content-analysis'));bindRecords($('#collaboration-analysis'));
    }
    function renderExamples(){const rows=overview(),apps=rows.filter(r=>r.assetType==='教学应用'),counts=sumBy(apps,'subject'),total=apps.length;
      $('#application-total').textContent=fmt(total);const options=$('#subject-options');options.replaceChildren();subjects.forEach(subject=>{const count=counts.find(g=>g.name===subject)?.value||0,b=document.createElement('button');b.type='button';b.dataset.subject=subject;b.setAttribute('aria-pressed',String(subject===selectedSubject));b.setAttribute('aria-controls','example-results');b.innerHTML='<span>'+subject+'</span><b>'+count+'</b><small>'+(total?count/total*100:0).toFixed(1)+'%</small><i><em style="width:'+(counts.length?count/Math.max(...counts.map(g=>g.value))*100:0)+'%"></em></i>';b.onclick=()=>{selectedSubject=subject;renderExamples();options.querySelector('[data-subject="'+subject+'"]')?.focus();};options.appendChild(b);});
      $('#map-title').textContent=selectedSubject+' · 内容分类';$('#subject-map').innerHTML='<div class="map-root">'+selectedSubject+'</div><ul class="map-branches">'+taxonomy[selectedSubject].map(([group,leaves])=>'<li><h4>'+group+'</h4><ul>'+leaves.map(l=>'<li>'+l+'</li>').join('')+'</ul></li>').join('')+'</ul>';
      const cases=data.cases.filter(c=>c.schoolId===data.id&&c.subject===selectedSubject&&c.date>=filters.start&&c.date<=filters.end);
      $('#cases-title').textContent=selectedSubject+' · 优秀案例';$('#case-count').textContent=cases.length+' 个案例';
      $('#case-grid').innerHTML=cases.map(c=>'<button type="button" class="case-card" data-record="'+c.recordId+'"><span class="case-cover" style="background-position:'+([44,529,1004,1486][c.cover%4]/1599*100)+'% '+([24,398,778][Math.floor(c.cover/4)]/880*100)+'%"><i>查看对话 ↗</i></span><span class="case-detail"><b>'+escape(c.title)+'</b><small>'+escape(c.teacher+' · '+data.name)+'</small><em>'+c.subject+' · '+c.grade+'</em><span>'+escape(c.purpose)+'</span></span></button>').join('');
      $('#case-empty').hidden=cases.length>0;bindRecords($('#case-grid'));
    }
    const dialog=$('#conversation-dialog');
    function bindRecords(container){container.querySelectorAll('[data-record]').forEach(b=>b.onclick=()=>openDialogue(b.dataset.record,b));}
    function openDialogue(id,trigger){const markup=dialogMarkup(data,id);if(!markup)return;previewRecord=data.records.find(r=>r.id===id);focusReturn=trigger;dialog.innerHTML=markup;dialog.dataset.fileOpen='false';dialog.querySelector('[data-close]').onclick=()=>dialog.close();
      dialog.querySelectorAll('[data-file]').forEach(b=>b.onclick=()=>{const f=previewRecord.files.find(f=>f.id===b.dataset.file);if(!f)return;dialog.querySelector('#file-preview').hidden=false;dialog.dataset.fileOpen='true';dialog.querySelector('.file-document').innerHTML='<p class="file-type">静态演示预览</p><h2>'+escape(f.name)+'</h2>'+f.sections.map(([title,body])=>'<section><h3>'+escape(title)+'</h3><p>'+escape(body)+'</p></section>').join('');dialog.querySelectorAll('[data-file]').forEach(x=>x.setAttribute('aria-expanded',String(x===b)));dialog.querySelector('[data-back]').focus();});
      dialog.querySelector('[data-back]').onclick=()=>{dialog.querySelector('#file-preview').hidden=true;dialog.dataset.fileOpen='false';const selected=dialog.querySelector('[data-file][aria-expanded="true"]');selected?.setAttribute('aria-expanded','false');selected?.focus();};dialog.showModal();dialog.querySelector('[data-close]').focus();
    }
    dialog.addEventListener('close',()=>{dialog.innerHTML='';if(focusReturn?.isConnected)focusReturn.focus();previewRecord=null;});
    dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
    function renderAll(){renderOverview();renderResearch();renderExamples();$('#period-label').textContent=filters.start+' — '+filters.end;}
    $('#apply-dates').onclick=()=>{const next={...filters,start:$('#date-start').value,end:$('#date-end').value};try{selectRecords(data,next);}catch(e){$('#page-status').textContent=e.message;return;}filters=next;$('#page-status').textContent='';capabilityPage=0;rankingPages.turns=rankingPages.work=0;if(dialog.open)dialog.close();renderAll();};
    const grade=$('#filter-grade'),subject=$('#filter-subject'),editor=$('#filter-editor'),open=$('#filter-open');
    grade.innerHTML='<option value="">全部年级</option>'+['七年级','八年级','九年级','高一','高二','高三'].map(g=>'<option>'+g+'</option>').join('');subject.innerHTML='<option value="">全部学科</option>'+subjects.map(s=>'<option>'+s+'</option>').join('');
    function closeFilters(){editor.hidden=true;open.setAttribute('aria-expanded','false');open.focus();}
    open.onclick=()=>{if(!editor.hidden){closeFilters();return;}grade.value=filters.grade;subject.value=filters.subject;editor.hidden=false;open.setAttribute('aria-expanded','true');grade.focus();};
    $('#filter-cancel').onclick=closeFilters;$('#filter-apply').onclick=()=>{filters={...filters,grade:grade.value,subject:subject.value};if(dialog.open)dialog.close();renderResearch();closeFilters();};editor.onkeydown=e=>{if(e.key==='Escape'){e.preventDefault();closeFilters();}};
    document.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{sort=b.dataset.sort;document.querySelectorAll('[data-sort]').forEach(x=>{x.classList.toggle('selected',x===b);x.closest('th').setAttribute('aria-sort',x===b?'descending':'none');});renderResearch();});
    activate('overview');renderAll();
    global.setInterval?.(()=>{
      if(recentRows.length<=5||active!=='overview'||document.hidden||recentHovered||recentFocused||dialog.open||reducedMotion?.matches)return;
      recentIndex=(recentIndex+1)%recentRows.length;renderRecent(true);
    },1700);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})(globalThis);
