dojo.declare("com.nuclearunicorn.game.Math",null,{constructor:function(){},uniformRandomInteger:function(a,b){a=Math.round(a);b=Math.round(b);return a+Math.floor(Math.random()*(b-a))},standardGaussianRandom:function(){for(var a=0,b=0;0===a;)a=Math.random();for(;0===b;)b=Math.random();return Math.sqrt(-2*Math.log(a))*Math.cos(2*Math.PI*b)},irwinHallRandom:function(a){return this.loopOrGaussianApproximation(a,!1,.5,1/12,0,1,Math.random)},binominalRandomInteger:function(a,b){return 0>=b?0:1<=b?a:this.loopOrGaussianApproximation(a,
!0,b,b*(1-b),0,1,function(){return Math.random()<b?1:0})},loopOrGaussianApproximation:function(a,b,f,e,c,d,h){f*=a;e=Math.sqrt(a*e);c*=a;var g=a*d;if(100>a||f-5*e<c||f+5*e>g){for(d=0;0<a;--a)d+=h();return d}for(;;)if(d=e*this.standardGaussianRandom()+f,b&&(d=Math.round(d)),c<=d&&d<=g)return d},log1p:function(a){if(.25<Math.abs(a))return Math.log(1+a);var b=a,f=-a,e=[0,b];a=1+Math.ceil(-52*Math.LN2/Math.log(Math.abs(a)));for(var c=2;c<=a;++c)b*=f,e[c]=b/c;b=e[a];for(c=a-1;1<=c;--c)b+=e[c];return b}});
