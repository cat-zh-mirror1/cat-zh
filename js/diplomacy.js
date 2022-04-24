dojo.declare("classes.managers.DiplomacyManager",null,{game:null,defaultGoldCost:15,defaultManpowerCost:50,baseGoldCost:15,baseManpowerCost:50,races:[{name:"lizards",title:$I("trade.race.lizards"),standing:.25,embassyPrices:[{name:"culture",val:100}],buys:[{name:"minerals",val:1E3}],sells:[{name:"wood",value:500,chance:1,width:.08,seasons:{spring:-.05,summer:.35,autumn:.15,winter:.05}},{name:"beam",value:10,chance:.25,width:.15,minLevel:5},{name:"scaffold",value:1,chance:.1,width:.1,minLevel:10}],
collapsed:!1,pinned:!1},{name:"sharks",title:$I("trade.race.sharks"),standing:0,embassyPrices:[{name:"culture",val:100}],buys:[{name:"iron",val:100}],sells:[{name:"catnip",value:35E3,chance:1,width:.15,seasons:{spring:.2,summer:-.05,autumn:.15,winter:.45}},{name:"parchment",value:5,chance:.25,width:.25,minLevel:5},{name:"manuscript",value:3,chance:.15,width:.25,minLevel:10},{name:"compedium",value:1,chance:.1,width:.25,minLevel:15}],collapsed:!1,pinned:!1},{name:"griffins",title:$I("trade.race.griffins"),
standing:-.15,embassyPrices:[{name:"culture",val:1E3}],buys:[{name:"wood",val:500}],sells:[{name:"iron",value:250,chance:1,width:.12,seasons:{spring:-.25,summer:-.05,autumn:.35,winter:-.2}},{name:"steel",value:25,chance:.25,width:.1,minLevel:5},{name:"gear",value:5,chance:.1,width:.25,minLevel:10}],collapsed:!1,pinned:!1},{name:"nagas",title:$I("trade.race.nagas"),standing:0,hidden:!0,buys:[{name:"ivory",val:500}],embassyPrices:[{name:"culture",val:500}],sells:[{name:"minerals",value:1E3,chance:1,
width:.18,seasons:{spring:.25,summer:.05,autumn:-.35,winter:-.05}},{name:"slab",value:5,chance:.75,width:.15,minLevel:5},{name:"concrate",value:5,chance:.25,width:.05,minLevel:10},{name:"megalith",value:1,chance:.1,width:.1,minLevel:15}],collapsed:!1,pinned:!1},{name:"zebras",hidden:!0,title:$I("trade.race.zebras"),standing:-.3,embassyPrices:[{name:"culture",val:25E3}],buys:[{name:"slab",val:50}],sells:[{name:"iron",value:300,chance:1,width:.08,seasons:{spring:0,summer:.15,autumn:-.1,winter:-.2}},
{name:"plate",value:2,chance:.65,width:.25,seasons:{spring:.05,summer:-.15,autumn:.05,winter:.25}},{name:"alloy",value:.25,chance:.05,width:.05,minLevel:5}],unlocks:{policies:["zebraRelationsAppeasement","zebraRelationsBellicosity"]},collapsed:!1,pinned:!1},{name:"spiders",hidden:!0,title:$I("trade.race.spiders"),standing:.15,embassyPrices:[{name:"culture",val:5E3}],buys:[{name:"scaffold",val:50}],sells:[{name:"coal",value:350,chance:1,width:.15,seasons:{spring:0,summer:.05,autumn:.15,winter:-.05}},
{name:"oil",value:100,chance:.25,width:.15,minLevel:5}],collapsed:!1,pinned:!1},{name:"dragons",hidden:!0,title:$I("trade.race.dragons"),standing:0,embassyPrices:[{name:"culture",val:7500}],buys:[{name:"titanium",val:250}],sells:[{name:"uranium",value:1,chance:.95,width:.25},{name:"thorium",value:1,chance:.5,width:.25,minLevel:5}],collapsed:!1,pinned:!1},{name:"leviathans",hidden:!0,title:$I("trade.race.leviathans"),standing:0,buys:[{name:"unobtainium",val:5E3}],sells:[{name:"starchart",value:250,
chance:.5,width:.8},{name:"timeCrystal",value:.25,chance:.98,width:.15},{name:"sorrow",value:1,chance:.15,width:.1},{name:"relic",value:1,chance:.05,width:0}],unlocks:{policies:["transkittenism","necrocracy","radicalXenophobia"]},collapsed:!1,pinned:!1}],constructor:function(a){this.game=a},get:function(a){for(var b=0;b<this.races.length;b++)if(this.races[b].name==a)return this.races[b];console.error("Failed to get race for id '"+a+"'");return null},getTradeRatio:function(){return this.game.getEffect("tradeRatio")+
this.game.village.getEffectLeader("merchant",0)},resetState:function(){for(var a=0;a<this.races.length;a++){var b=this.races[a];b.embassyLevel=0;b.unlocked=!1;b.collapsed=!1;b.pinned=!1;b.energy=0;b.duration=0}},save:function(a){a.diplomacy={races:this.game.bld.filterMetadata(this.races,"name embassyLevel unlocked collapsed energy duration pinned".split(" "))}},load:function(a){a.diplomacy&&this.game.bld.loadMetadata(this.races,a.diplomacy.races)},hasUnlockedRaces:function(){for(var a=0;a<this.races.length;a++)if(this.races[a].unlocked)return!0;
return!1},isValidTrade:function(a,b){var c=a.name;a=!a.minLevel||b.embassyLevel>=a.minLevel;b=this.game.resPool.get(c).unlocked||"uranium"===c||"leviathans"===b.name;return a&&b},unlockRandomRace:function(){for(var a=[],b=!1,c=0;c<this.races.length;c++)this.races[c].unlocked||(this.races[c].hidden?b=!0:a.push(this.races[c]));if(!a.length&&!b)return null;b=this.get("nagas");if(!b.unlocked&&1500<=this.game.resPool.get("culture").value)return b.unlocked=!0,b;b=this.get("zebras");if(!b.unlocked&&1<=this.game.resPool.get("ship").value)return b.unlocked=
!0,this.game.workshop.get("caravanserai").unlocked=!0,this.game.science.getPolicy("zebraRelationsAppeasement").unlocked=!0,this.game.science.getPolicy("zebraRelationsBellicosity").unlocked=!0,b;b=this.get("spiders");if(!b.unlocked&&100<=this.game.resPool.get("ship").value&&125E3<this.game.resPool.get("science").maxValue)return b.unlocked=!0,b;b=this.get("dragons");if(!b.unlocked&&this.game.science.get("nuclearFission").researched)return b.unlocked=!0,b;b=Math.floor(Math.random()*a.length);return a[b]?
(a[b].unlocked=!0,a[b]):null},update:function(){if(!this.hasUnlockedRaces()){var a=this.game.prestige.getPerk("navigationDiplomacy").researched&&0<this.game.resPool.get("ship").value?0:this.game.prestige.getPerk("diplomacy").researched?1:0<this.game.karmaKittens?5:20;if(this.game.calendar.year<a)return;a=this.unlockRandomRace();this.game.diplomacyTab.visible=!0;this.game.render();this.game.msg($I("trade.msg.emissary",[a.title]),"notice")}if(this.game.ironWill&&this.game.challenges.isActive("blackSky")){a=
this.get("sharks");var b=this.get("griffins");this.hasUnlockedRaces()&&(a.unlocked||(this.game.msg($I("trade.msg.emissary",[a.title]),"notice"),a.unlocked=!0),b.unlocked||(this.game.msg($I("trade.msg.emissary",[b.title]),"notice"),b.unlocked=!0));this.baseGoldCost=this.defaultGoldCost;this.baseManpowerCost=this.defaultManpowerCost;this.game.workshop.get("goldOre").researched||(this.baseGoldCost=0==this.game.resPool.get("gold").value?0:this.defaultGoldCost,this.baseManpowerCost=0==this.game.resPool.get("manpower").value?
0:this.defaultManpowerCost);for(var c=0;c<b.buys.length;c++)"wood"==b.buys[c].name&&(b.buys[c].val=400);for(c=0;c<a.sells.length;c++)b=a.sells[c],"catnip"==b.name&&(b.name="science",b.value=80,b.seasons={spring:0,summer:-.1,autumn:-.2,winter:-.5})}},onLeavingIW:function(){for(var a=this.get("sharks"),b=this.get("griffins"),c=0;c<b.buys.length;c++)"wood"==b.buys[c].name&&(b.buys[c].val=500);this.baseGoldCost=this.defaultGoldCost;this.baseManpowerCost=this.defaultManpowerCost;for(c=0;c<a.sells.length;c++)b=
a.sells[c],"science"==b.name&&(b.name="catnip",b.value=35E3,b.seasons={spring:.2,summer:-.05,autumn:.15,winter:.45})},unlockElders:function(){var a=this.get("leviathans");!a.duration&&this.hasUnlockedRaces()&&(a.unlocked=!0,a.duration=this.game.calendar.daysPerSeason*this.game.calendar.seasonsPerYear*(5+a.energy),a.autoPinned&&(a.pinned=!0),this.game.msg($I("trade.msg.elders"),"urgent","elders"))},onNewDay:function(){var a=this.get("leviathans");0>=a.duration&&a.unlocked?(a.unlocked=!1,a.pinned=!1,
this.game.msg($I("trade.msg.elders.departed"),"notice","elders"),this.game.render()):0<a.duration&&a.duration--},tradeImpl:function(a,b){this.game.ironWill&&this.game.challenges.isActive("blackSky")&&("griffins"==a.name&&(this.game.resPool.get("iron").unlocked=!0),"sharks"==a.name&&(this.game.resPool.get("science").unlocked=!0));a.unlocks&&this.game.unlock(a.unlocks);var c=1==b,d=this.game.getEffect("standingRatio")+this.game.diplomacy.calculateStandingFromPolicies(a.name,this.game),h=0>a.standing?
this.game.math.binominalRandomInteger(b,-(a.standing+d)):0;h=b-h;if(0==h)c&&this.game.msg($I("trade.msg.trade.failure",[a.title]),null,"trade");else{a.duration=Math.min(a.duration,this.game.calendar.daysPerSeason*(this.game.calendar.seasonsPerYear+a.energy));b=0<a.standing?this.game.math.binominalRandomInteger(b,a.standing+d/2):0;d=h-b;0<b&&c&&this.game.msg($I("trade.msg.trade.success",[a.title]),null,"trade");c={};for(var q=1+this.game.diplomacy.getTradeRatio()+this.game.diplomacy.calculateTradeBonusFromPolicies(a.name,
this.game)+this.game.challenges.getChallenge("pacifism").getTradeBonusEffect(this.game),t=1+.02*a.energy,u=this.game.calendar.getCurSeason().name,r=this.game.ironWill?.0025:.01,k=0;k<a.sells.length;k++){var e=a.sells[k];if(this.game.diplomacy.isValidTrade(e,a)){var f=e.chance*(1+(a.embassyPrices?this.game.getLimitedDR(a.embassyLevel*r,.75):0)),g=this.game.math.binominalRandomInteger(d,f);f=this.game.math.binominalRandomInteger(b,f);0!=g+f&&(g=this._fuzzGainedAmount(g,e.width),f=this._fuzzGainedAmount(f,
e.width),c[e.name]=(g+1.25*f)*e.value*q*t*(1+(e.seasons?e.seasons[u]:0)))}}b=this.game.math.binominalRandomInteger(h,.35*(1+(a.embassyPrices?a.embassyLevel*r:0)));c.spice=25*b+50*q*this.game.math.irwinHallRandom(b);c.blueprint=Math.floor(this.game.math.binominalRandomInteger(h,.1));"zebras"==a.name&&(a=this.game.resPool.get("ship").value,b=this.game.getEffect("zebraRelationModifier")*this.game.bld.getBuildingExt("tradepost").meta.effects.tradeRatio,c.titanium=(1.5+.03*a)*(1+b)*this.game.math.binominalRandomInteger(h,
.15+.0035*a));this.game.stats.getStat("totalTrades").val+=h;this.game.stats.getStatCurrent("totalTrades").val+=h;return c}},_fuzzGainedAmount:function(a,b){return a+b*(this.game.math.irwinHallRandom(a)-a/2)},getManpowerCost:function(){var a=this.baseManpowerCost-this.game.getEffect("tradeCatpowerDiscount");return 0>a?0:a},getGoldCost:function(){var a=this.baseGoldCost-this.game.getEffect("tradeGoldDiscount");return 0>a?0:a},trade:function(a){this.gainTradeRes(this.tradeImpl(a,1),1)},tradeMultiple:function(a,
b){if(this.hasMultipleResources(a,b)){var c=this.getManpowerCost(),d=this.getGoldCost();this.game.challenges.isActive("postApocalypse")&&(c*=1+this.game.bld.getPollutionLevel(),d*=1+this.game.bld.getPollutionLevel());this.game.resPool.addResEvent("manpower",-c*b);this.game.resPool.addResEvent("gold",-d*b);this.game.resPool.addResEvent(a.buys[0].name,-a.buys[0].val*b);this.gainTradeRes(this.tradeImpl(a,b),b)}},hasMultipleResources:function(a,b){return this.game.resPool.get("gold").value>=this.getGoldCost()*
b&&this.game.resPool.get("manpower").value>=this.getManpowerCost()*b&&this.game.resPool.get(a.buys[0].name).value>=a.buys[0].val*b},tradeAll:function(a){this.tradeMultiple(a,this.getMaxTradeAmt(a))},gainTradeRes:function(a,b){if(a){var c=!1,d;for(d in a){var h=this.game.resPool.addResEvent(d,a[d]);if(0<h){c=this.game.resPool.get(d).title||d;h=$I("trade.msg.resources",[this.game.getDisplayValueExt(h),c]);c=null;if("titanium"==d||"blueprint"==d||"relic"==d)h+="!",c="notice";this.game.msg(h,c,"trade",
!0);c=!0}}c||this.game.msg($I("trade.msg.trade.empty"),null,"trade",!0);this.game.msg($I("trade.msg.trade.caravan",[b]),null,"trade")}},getMaxTradeAmt:function(a){var b=this.getManpowerCost(),c=this.getGoldCost();this.game.challenges.isActive("postApocalypse")&&(b*=1+this.game.bld.getPollutionLevel(),c*=1+this.game.bld.getPollutionLevel());a=[Math.floor(this.game.resPool.get("gold").value/Math.max(c,1)),Math.floor(this.game.resPool.get("manpower").value/Math.max(b,1)),Math.floor(this.game.resPool.get(a.buys[0].name).value/
a.buys[0].val)];a[0]+=0<c?0:Number.MAX_VALUE;a[1]+=0<b?0:Number.MAX_VALUE;b=Number.MAX_VALUE;for(c=0;c<a.length;c++)b>a[c]&&(b=a[c]);if(b!=Number.MAX_VALUE&&0!=b)return b},getMarkerCap:function(){return Math.floor((5*this.game.religion.getZU("marker").getEffectiveValue(this.game)+5)*(1+this.game.getEffect("leviathansEnergyModifier")))},feedElders:function(){var a=this.game.resPool.get("necrocorn"),b=this.game.diplomacy.get("leviathans");if(1<=a.value){b.energy++;var c=this.game.diplomacy.getMarkerCap();
b.energy>c&&(b.energy=c);a.value--;this.game.msg($I("trade.msg.elders.pleased"),"notice")}else a.value=0,this.game.msg($I("trade.msg.elders.displeased"),"notice"),b.duration=0},buyBcoin:function(){var a=this.game.resPool.get("relic").value/this.game.calendar.cryptoPrice;this.game.resPool.get("blackcoin").value+=a;this.game.resPool.get("relic").value=0;this.game.msg($I("trade.bcoin.buy.msg",[this.game.getDisplayValueExt(a)]))},sellBcoin:function(){var a=this.game.resPool.get("blackcoin").value*this.game.calendar.cryptoPrice;
this.game.resPool.get("relic").value+=a;this.game.resPool.get("blackcoin").value=0;this.game.msg($I("trade.bcoin.sell.msg",[this.game.getDisplayValueExt(a)]))},unlockAll:function(){for(var a in this.races)this.races[a].unlocked=!0;this.get("leviathans").duration=1E4;this.game.msg("All trade partners are unlocked")},calculatePhantomTradeposts:function(a,b){var c=0+b.getEffect("globalRelationsBonus");return c="zebras"==a?c+b.getEffect("zebraRelationModifier"):c+b.getEffect("nonZebraRelationModifier")},
calculateStandingFromPolicies:function(a,b){var c=b.bld.getBuildingExt("tradepost").meta.effects.standingRatio;return b.diplomacy.calculatePhantomTradeposts(a,b)*c},calculateTradeBonusFromPolicies:function(a,b){var c=b.bld.getBuildingExt("tradepost").meta.effects.tradeRatio;return b.diplomacy.calculatePhantomTradeposts(a,b)*c}});
dojo.declare("classes.diplomacy.ui.RacePanel",com.nuclearunicorn.game.ui.Panel,{tradeBtn:null,embassyButton:null,constructor:function(a){this.race=a;this.name=a.title},onToggle:function(a){this.race.collapsed=a},render:function(a){var b=this.game.diplomacy.calculateStandingFromPolicies(this.race.name,this.game);b=0<this.race.standing?"friendly":0==this.race.standing?"neutral":0>this.race.standing+this.game.getEffect("standingRatio")+b?"hostile":"nowNeutral";this.name=this.race.title+" <span class='attitude'>"+
$I("trade.attitude."+b)+"</span>";return this.inherited(arguments)},update:function(){this.tradeBtn&&this.tradeBtn.update();this.embassyButton&&this.embassyButton.update();this.autoPinnedButton&&this.autoPinnedButton.update()}});
dojo.declare("classes.diplomacy.ui.EldersPanel",classes.diplomacy.ui.RacePanel,{feedBtn:null,render:function(a){var b=this.inherited(arguments),c=this;this.feedBtn=new com.nuclearunicorn.game.ui.ButtonModern({name:$I("trade.msg.elders.feed"),description:$I("trade.msg.elders.feed.desc"),controller:new com.nuclearunicorn.game.ui.ButtonModernController(this.game),handler:function(){c.game.diplomacy.feedElders()}},this.game);this.feedBtn.render(b);if(this.game.science.get("blackchain").researched||0<
this.game.resPool.get("blackcoin").value)this.buyBcoin=new com.nuclearunicorn.game.ui.ButtonModern({name:$I("trade.bcoin.buy"),description:$I("trade.bcoin.buy.desc"),controller:new com.nuclearunicorn.game.ui.ButtonModernController(this.game),handler:function(){c.game.diplomacy.buyBcoin()}},this.game),this.buyBcoin.render(b),this.sellBcoin=new com.nuclearunicorn.game.ui.ButtonModern({name:$I("trade.bcoin.sell"),description:$I("trade.bcoin.sell.desc"),controller:new com.nuclearunicorn.game.ui.ButtonModernController(this.game),
handler:function(){c.game.diplomacy.sellBcoin()}},this.game),this.sellBcoin.render(b);this.game.science.get("antimatter").researched&&this.game.workshop.get("invisibleBlackHand").researched&&(this.crashBcoin=new com.nuclearunicorn.game.ui.ButtonModern({name:$I("trade.bcoin.crash"),description:$I("trade.bcoin.crash.desc"),controller:new com.nuclearunicorn.game.ui.CrashBcoinButtonController(this.game),handler:function(){c.game.calendar.correctCryptoPrice()}},this.game),this.crashBcoin.render(b));return b},
update:function(){this.inherited(arguments);this.feedBtn&&this.feedBtn.update();this.crashBcoin&&this.crashBcoin.update()}});
dojo.declare("com.nuclearunicorn.game.ui.CrashBcoinButtonController",com.nuclearunicorn.game.ui.ButtonModernController,{defaults:function(){var a=this.inherited(arguments);a.hasResourceHover=!0;a.simplePrices=!0;return a},updateEnabled:function(a){this.inherited(arguments);a.enabled&=550<this.game.calendar.cryptoPrice},fetchExtendedModel:function(a){a.prices=this.getPrices();this.inherited(arguments)},getPrices:function(){var a=.002401*this.game.space.getBuilding("moonOutpost").val;a*=1+.01*this.game.space.getBuilding("spaceElevator").val+
.02*this.game.space.getBuilding("orbitalArray").val;a*=1+.045*this.game.bld.get("factory").val;a*=1.03+this.game.getEffect("tradeRatio")+.03*this.game.prestige.getBurnedParagonRatio();a*=1+.02*this.game.diplomacy.get("leviathans").energy;var b=this.game.calendar.ticksPerDay*this.game.calendar.daysPerSeason*this.game.calendar.seasonsPerYear,c=1.13*a/b;b=(2.4*a-9)/b;var d=this.game.challenges.getChallenge("1000Years").researched?5:10;a=1.13*a*this.game.getEffect("shatterTCGain")*(1+this.game.getEffect("rrRatio"));
a=c+((1+d/100)*a-1)/d*this.game.getEffect("heatPerTick");return[{name:"timeCrystal",val:Math.pow(2,Math.ceil(Math.log(Math.max(256,8000466.693057134*Math.max(c,b,a)*Math.log(1100/this.game.calendar.cryptoPrice)))*Math.LOG2E))}]}});dojo.declare("com.nuclearunicorn.game.ui.TradeButtonController",com.nuclearunicorn.game.ui.ButtonModernController,{defaults:function(){var a=this.inherited(arguments);a.hasResourceHover=!0;a.simplePrices=!1;return a}});
dojo.declare("com.nuclearunicorn.game.ui.TradeButton",com.nuclearunicorn.game.ui.ButtonModern,{race:null,trade25Href:null,trade100Href:null,tradeAllHref:null,constructor:function(a,b){this.race=a.race;this.handler=this.trade},afterRender:function(){this.inherited(arguments);dojo.addClass(this.domNode,"trade")},renderLinks:function(){this.tradeAllHref=this.addLink({title:$I("btn.all.minor"),handler:function(){this.game.diplomacy.tradeAll(this.race)}});this.tradeHalfHref=this.addLink({title:"",handler:""});
this.tradeFifthHref=this.addLink({title:"",handler:""})},update:function(){this.inherited(arguments);var a=this.game.diplomacy.getMaxTradeAmt(this.race);this.tradeAllHref.link.title="x"+this.game.getDisplayValueExt(a,null,!1,0);var b=Math.floor(a/2);this.tradeHalfHref.link.textContent=this.game.opts.usePercentageConsumptionValues?"50%":"x"+this.game.getDisplayValueExt(b,null,!1,0);this.tradeHalfHref.link.title=this.game.opts.usePercentageConsumptionValues?"x"+this.game.getDisplayValueExt(b,null,!1,
0):"50%";dojo.disconnect(this.tradeHalfHref.linkHandler);this.tradeHalfHref.linkHandler=dojo.connect(this.tradeHalfHref.link,"onclick",this,dojo.partial(function(d){d.stopPropagation();d.preventDefault();dojo.hitch(this,function(){this.game.diplomacy.tradeMultiple(this.race,b)},d)();this.update()}));dojo.style(this.tradeHalfHref.link,"display",this.game.opts.showNonApplicableButtons||this.game.diplomacy.hasMultipleResources(this.race,50)?"":"none");var c=Math.floor(a/5);this.tradeFifthHref.link.textContent=
this.game.opts.usePercentageConsumptionValues?"20%":"x"+this.game.getDisplayValueExt(c,null,!1,0);this.tradeFifthHref.link.title=this.game.opts.usePercentageConsumptionValues?"x"+this.game.getDisplayValueExt(c,null,!1,0):"20%";dojo.disconnect(this.tradeFifthHref.linkHandler);this.tradeFifthHref.linkHandler=dojo.connect(this.tradeFifthHref.link,"onclick",this,dojo.partial(function(d){d.stopPropagation();d.preventDefault();dojo.hitch(this,function(){this.game.diplomacy.tradeMultiple(this.race,c)},d)();
this.update()}));dojo.style(this.tradeFifthHref.link,"display",this.game.opts.showNonApplicableButtons||this.game.diplomacy.hasMultipleResources(this.race,25)?"":"none")}});
dojo.declare("classes.diplomacy.ui.EmbassyButtonController",com.nuclearunicorn.game.ui.BuildingStackableBtnController,{defaults:function(){var a=this.inherited(arguments);a.simplePrices=!1;return a},getMetadata:function(a){if(!a.metaCached){var b=a.options.race;a.metaCached={label:$I("trade.embassy.label"),description:$I("trade.embassy.desc"),val:b.embassyLevel,on:b.embassyLevel}}return a.metaCached},getPrices:function(a){for(var b=dojo.clone(a.options.prices),c=1-this.game.getEffect("embassyCostReduction"),
d=0;d<b.length;d++)b[d].val=b[d].val*c*Math.pow(1.15,a.options.race.embassyLevel+this.game.getEffect("embassyFakeBought"));return b},buyItem:function(a,b,c){this.inherited(arguments);this.game.ui.render()},incrementValue:function(a){this.inherited(arguments);a.options.race.embassyLevel++},hasSellLink:function(a){return!1},updateVisible:function(a){a.visible=this.game.science.get("writing").researched}});
dojo.declare("classes.diplomacy.ui.EmbassyButton",com.nuclearunicorn.game.ui.ButtonModern,{pinLinkHref:null,race:null,constructor:function(a,b){this.race=a.race},renderLinks:function(){this.pinLinkHref=this.addLink({title:"&#9733;",handler:function(){this.race.embassyLevel&&(this.race.pinned=!this.race.pinned,console.log("toggled pin for race:",this.game.diplomacy.races))}})},update:function(){this.inherited(arguments);this.pinLinkHref.link.textContent=this.race.pinned?"[v]":"[ ]";this.pinLinkHref.link.title=
this.race.pinned?$I("trade.embassy.pinned"):$I("trade.embassy.unpinned")}});dojo.declare("classes.diplomacy.ui.autoPinnedButtonController",com.nuclearunicorn.game.ui.ButtonModernController,{defaults:function(){var a=this.inherited(arguments);a.hasResourceHover=!1;a.simplePrices=!1;return a},getName:function(a){return a.options.race.autoPinned?$I("trade.autopinned.labelOn"):$I("trade.autopinned.labelOff")},hasSellLink:function(a){return!1},updateVisible:function(a){a.visible=!0}});
dojo.declare("classes.diplomacy.ui.autoPinnedButton",com.nuclearunicorn.game.ui.ButtonModern,{pinLinkHref:null,race:null,constructor:function(a,b){this.race=a.race},renderLinks:function(){this.pinLinkHref=this.addLink({title:"&#9733;",handler:function(){"leviathans"==this.race.name&&(this.race.pinned=!this.race.pinned)}})},update:function(){this.inherited(arguments);this.pinLinkHref.link.textContent=this.race.pinned?"[v]":"[ ]";this.pinLinkHref.link.title=this.race.pinned?$I("trade.embassy.pinned"):
$I("trade.embassy.unpinned")}});
dojo.declare("classes.trade.ui.SendExplorersButtonController",com.nuclearunicorn.game.ui.ButtonModernController,{defaults:function(){var a=this.inherited(arguments);a.hasResourceHover=!0;a.simplePrices=!1;return a},clickHandler:function(a,b){a=this.game.diplomacy;a.unlockRandomRace()?this.game.msg($I("trade.new.civ"),"notice"):(a=a.get("nagas").unlocked?a.get("zebras").unlocked?a.get("spiders").unlocked?a.get("dragons").unlocked?$I("trade.new.hint.end"):$I("trade.new.hint.dragons"):$I("trade.new.hint.spiders"):
$I("trade.new.hint.zebras"):$I("trade.new.hint.nagas"),this.game.msg($I("trade.new.failure",[a])),this.game.resPool.addResEvent("manpower",950));this.game.render()}});dojo.declare("classes.trade.ui.SendExplorersButton",com.nuclearunicorn.game.ui.ButtonModern,{afterRender:function(){this.inherited(arguments);dojo.addClass(this.domNode,"explore")}});
dojo.declare("com.nuclearunicorn.game.ui.tab.Diplomacy",com.nuclearunicorn.game.ui.tab,{racePanels:null,leviathansInfo:null,constructor:function(a,b){this.game=b;this.racePanels=[]},render:function(a){this.inherited(arguments);this.buttons=[];for(var b=[],c=0;c<this.game.diplomacy.races.length;c++){var d=this.game.diplomacy.races[c];d.unlocked&&b.push(d)}this.racePanels.length!=b.length&&(this.racePanels=[]);var h=this,q=dojo.create("div",{class:"expandAllBar",style:{float:"left"}},a);dojo.create("span",
{innerHTML:$I("trade.effectiveness",[this.game.getDisplayValueExt(100*this.game.diplomacy.getTradeRatio(),!1,!1,0)])},q);c=dojo.create("div",{class:"expandAllBar"},a);q=dojo.create("a",{innerHTML:$I("common.expand.all"),href:"#"},c);dojo.create("span",{innerHTML:" | "},c);var t=dojo.create("a",{innerHTML:$I("common.collapse.all"),href:"#"},c);dojo.create("div",{class:"clear"},a);var u=1+this.game.diplomacy.getTradeRatio(),r=this.game.calendar.getCurSeason().name;for(c=0;c<b.length;c++)if(d=b[c],d.unlocked){var k=
u+this.game.diplomacy.calculateTradeBonusFromPolicies(d.name,this.game)+this.game.challenges.getChallenge("pacifism").getTradeBonusEffect(this.game),e=this.racePanels[c];e||(e="leviathans"===d.name?new classes.diplomacy.ui.EldersPanel(d):new classes.diplomacy.ui.RacePanel(d),e.setGame(this.game),this.racePanels.push(e));var f=e.render(a);dojo.addClass(f,"trade-race");var g=dojo.create("div",{},f),m=dojo.create("div",{},f);f=dojo.create("div",{},f);dojo.addClass(g,"left");dojo.addClass(m,"right");
dojo.addClass(f,"clear");e.feedBtn&&(this.leviathansInfo=dojo.create("div",{innerHTML:""},g),dojo.place(e.feedBtn.domNode,m,"first"));var n=d.buys[0];f=this.game.resPool.get(n.name);dojo.create("div",{innerHTML:"<span class='buys'>"+$I("trade.buys")+": </span>"+(f.title||f.name)+" <span class='tradeAmount'>"+n.val+"</span>"},g);for(n=0;n<d.sells.length;n++){var p=d.sells[n];if(this.game.diplomacy.isValidTrade(p,d)){f=this.game.resPool.get(p.name);var v=p.value*k*(1+.02*d.energy)*(1+(p.seasons?p.seasons[r]:
0)),w=0==n?"<span class='sells'>"+$I("trade.sells")+": </span>":"<span class='sells'></span>";dojo.create("div",{innerHTML:w+(f.title||f.name)+" <span class='tradeAmount'>"+this.game.getDisplayValueExt(v*(1-p.width/2),!1,!1,0)+" - "+this.game.getDisplayValueExt(v*(1+p.width/2),!1,!1,0)+"</span>"},g)}}"zebras"==d.name&&(f=this.game.getEffect("zebraRelationModifier")*this.game.bld.getBuildingExt("tradepost").meta.effects.tradeRatio,k=this.game.resPool.get("titanium"),f=this.game.getDisplayValueExt((1.5+
.03*this.game.resPool.get("ship").value)*(1+f),!1,!1,0),dojo.create("div",{innerHTML:"<span class='sells'></span>"+(k.title||k.name)+" <span class='tradeAmount'>"+f+" - "+f+"</span>"},g));g=[{name:"manpower",val:this.game.diplomacy.getManpowerCost()},{name:"gold",val:this.game.diplomacy.getGoldCost()}];this.game.challenges.isActive("postApocalypse")&&(g[0].val*=1+this.game.bld.getPollutionLevel(),g[1].val*=1+this.game.bld.getPollutionLevel());g=g.concat(d.buys);g=new com.nuclearunicorn.game.ui.TradeButton({name:$I("trade.send.caravan"),
description:$I("trade.send.caravan.desc"),prices:g,race:d,controller:new com.nuclearunicorn.game.ui.TradeButtonController(this.game),handler:dojo.partial(function(l){h.game.diplomacy.trade(l)},d)},this.game);g.render(m);e.tradeBtn=g;e.race=d;e.collapse(d.collapsed);"leviathans"!=d.name?(d=new classes.diplomacy.ui.EmbassyButton({prices:d.embassyPrices,race:d,controller:new classes.diplomacy.ui.EmbassyButtonController(this.game)},this.game),e.embassyButton=d,d.render(m)):(d=new classes.diplomacy.ui.autoPinnedButton({name:$I("trade.autopinned.labelOff"),
description:$I("trade.autopinned.desc"),race:d,controller:new classes.diplomacy.ui.autoPinnedButtonController(this.game),handler:dojo.partial(function(l){l.autoPinned=!l.autoPinned;h.game.ui.render()},d)},this.game),e.autoPinnedButton=d,d.render(m));e.buyBcoin&&e.sellBcoin&&(d=dojo.create("div",{className:"crypto-trade"},null),dojo.place(d,m,"last"),dojo.place(e.buyBcoin.domNode,d,"last"),dojo.place(e.sellBcoin.domNode,d,"last"));e.crashBcoin&&dojo.place(e.crashBcoin.domNode,m,"last")}dojo.connect(t,
"onclick",this,function(){for(var l in this.racePanels)this.racePanels[l].collapse(!0)});dojo.connect(q,"onclick",this,function(){for(var l in this.racePanels)this.racePanels[l].collapse(!1)});dojo.create("div",{style:{marginBottom:"15px"}},a);b=new classes.trade.ui.SendExplorersButton({name:$I("trade.send.explorers"),description:$I("trade.send.explorers.desc"),prices:[{name:"manpower",val:1E3}],controller:new classes.trade.ui.SendExplorersButtonController(this.game)},this.game);b.render(a);this.exploreBtn=
b;b=dojo.create("div",{},a);dojo.addClass(b,"clear");this.update()},update:function(){this.inherited(arguments);for(var a=0;a<this.racePanels.length;a++)this.racePanels[a].update();this.exploreBtn&&this.exploreBtn.update();if(this.leviathansInfo){a=this.game.diplomacy.get("leviathans");var b=this.game.diplomacy.getMarkerCap();b=a.energy?a.energy+" / "+b:"N/A";this.leviathansInfo.innerHTML=$I("trade.leviathans.energy")+b+"<br />"+$I("trade.leviathans.timeToLeave")+this.game.toDisplayDays(a.duration);
this.game.science.get("antimatter").researched&&(this.leviathansInfo.innerHTML+="<br /> "+$I("trade.bcoin.price")+" <span style='cursor:pointer' title='"+this.game.calendar.cryptoPrice+"'>"+this.game.getDisplayValueExt(this.game.calendar.cryptoPrice,!1,!1,5)+"R</span>")}this.updateTab()},updateTab:function(){this.tabName=$I("tab.name.trade");this.game.diplomacy.get("leviathans").unlocked&&(this.tabName+=$I("common.warning"));this.domNode&&(this.domNode.innerHTML=this.tabName)}});
