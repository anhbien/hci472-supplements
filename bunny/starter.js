(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"starter_atlas_1", frames: [[0,0,362,266]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_4 = function() {
	this.initialize(ss["starter_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2249,1119);


(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2568,918);


(lib.CachedBmp_1 = function() {
	this.initialize(img.CachedBmp_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2568,1445);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Blend = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(0,0,0.3738,0.3738);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Blend, new cjs.Rectangle(0,0,135.3,99.5), null);


(lib.Path_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DFE9EB").s().p("AIeHrIqGghQiAgGjwALQiZAHkOASQi2ANhLg1Qg+gtAbhHQAdhNCDAUQA0AIAqAWQAqAVAHAXQALAmguAVQgXALgaADQAlAQAkgIQAfgHAVgYQATgXAAgcQAAgegZgVQhJg/AGg/QADgcATgOQAVgQAgAFQA6AIBAAyQA7AvAsAAQA6AAAeglQAOgTADgTQgvAsg0gWQgtgUgZg5Qgag6ARgyQASg6BDgRQBHgRA0AVQAmAPAtAvQBFBHALAJQA0AsA9AQQB2AdBGg+QAjgeALglQg9BKhTAAQhHAAgxgxQgogogLhXQgLhdAehaQAihnBQg8QBehHCPAAQEQAABqCkQA7BaABCEQABA3gjAvQgmAzg9AJQhJAKgngwQgNgOgHgTIgFgQQgTApATAoQAYA0BOAVQAwAMA3gPQANgEBVggQA8gYAsgCQA9gDA+AhQArAXATAyQARAwgKAzQgKA1giAhQglAjg4gDQhEgFgUgwQgGgPgBgSIABgOIgHASQgHAXACAWQAHBEBaAZQAwAOAzgZQAagMBCgvQA7grAngOQA7gVA+ATQBWAbgFBPQgCAhgWAbQgWAcgjAJQgZAHhoAAQiRAAkrgNg");
	this.shape.setTransform(119.5569,50.4196);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,239.2,100.9), null);


(lib.Path_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B0C6CB").s().p("Ar4EUQgzgLgEgrQgEgsA7gPQBCgRBUAxQAtAbASAHQAjANAggHQA+gPAEglQACgMgFgNIgFgKIgEAaQgOAbguACQgmACgagTQgXgSgHgeQgHgcAMgbQANgcAdgMQBFgeBXAbIBCAUQAmAJAhgHQA1gLAQgdQANgXgNgWQgDAPgOAMQgbAagxgFQgqgFgagcQgYgaABgeQABhLAogxQBIhbC6AAQC6AAA2CCQAUAygIAzQgHAwgbAWQgiAcgxAAQg4AAgqgpIAHAMQAKAPAOAKQAwAjBRgRQAqgIAjgZIA3gsQA+g1BOAQQAuAKANAgQALAbgSAhQgRAfgfALQgjAMgggYIAMAVQAUAVAnAAQAeAAApgaQArgcAogFQAvgFAEAiQAEAkgxAjQgRAMgBAQQAAAPAOANQAhAfA0gSQgSgCgPgGQgggMAIgVQALgdBWgLQBZgMAUArQASAogqAYQgzAeh8gHQmTgWiJAFQkBAMi3AGQjMAIhjAAQhIAAgRgEg");
	this.shape.setTransform(81.6352,27.9634);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,163.3,56), null);


(lib.Path_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B0C6CB").s().p("Am7DGQgegIgCgfQgCgfAjgLQAmgMAxAjQAxAkAbgIQAjgKADgbIgFgZIgCATQgIATgbACQgtADgKgyQgJgxAlgTQAogWAyAUQA5AWAXgGQAfgIAKgVQAHgQgHgQQgCALgIAIQgQATgdgEQgYgDgPgUQgOgTAAgWQABg1AXgjQAqhBBtAAQBsAAAfBdQALAkgEAlQgFAigPAPQgUAUgcAAQghAAgYgdIASAaQAcAZAvgMQAegHAugwQAkglAuALQAbAHAHAXQAHATgKAXQgKAXgSAIQgVAIgTgRIAHAPQAMAPAXAAQASAAAXgTQAZgUAXgDQAcgEACAZQADAZgdAZQgVATASAWQATAWAfgNQgKgBgJgFQgTgIAFgPQAGgVAygIQA1gIALAeQALAdgZARQgdAVhJgFQjrgPhQADQiVAJhqAEQh3AFg6AAQgpAAgLgCg");
	this.shape.setTransform(47.552,20.0363);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,95.1,40.1), null);


(lib.Path_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DFE9EB").s().p("AnqD/QgbgWAKgnQAKgqA5AJQA2AIAIAcQAGAUgTANQgKAGgLACQAiAQATgfQATgegYgYQggggABgiQABghAeADQAZAEAcAaQAaAYATgBQAZgBAMgVIAGgUQgTAYgWgLQgUgKgMgeQgMgeAFgbQAHgfAcgKQAxgRAoAxIAkAoQAXAXAbAHQAzAOAcgiQAOgRAEgUQgYAogjACQgfABgWgZQgSgVgGgtQgHgyALgwQAch+B0gFQB0gFAxBVQAbAwADBGQACAdgOAaQgPAbgaAGQgfAGgSgYIgLgaQgIAWAKAVQALAbAiAKQAUAGAYgKQAFgCAjgTQA1gbAtAaQAoAYgHBCQgIBDgwgCQgdgBgKgZIgDgaIgEAiQAEAkAnAMQAVAHAVgOQALgHAbgbQAzgxApAOQAmANgBAqQAAAqggAMQgZAJjcgDIkTgGQhbgBj2AgQgVACgSAAQgvAAgZgTg");
	this.shape.setTransform(51.0517,27.4713);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0, new cjs.Rectangle(0,0,102.1,54.9), null);


(lib.Path = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B0C6CB").s().p("AspFHQg3gNgEgzQgEg0A/gSQBGgTBZA6QAwAfATAIQAlAQAjgJQBBgRAFgsQABgOgFgPIgFgNIgEAgQgOAfgyADQgoADgbgYQgZgVgIgjQgHgiANgfQANghAfgPQBKgjBcAgIBHAYQAoAKAjgIQA4gOASgiQAOgagOgbQgDARgPAPQgdAgg1gHQgsgGgcghQgZgfAAgkQAChYAqg7QBOhrDFAAQDGAAA5CaQAWA6gJA+QgHA5gdAaQgkAggzAAQg9ABgsgxIAIAOQAKARAPANQAzApBWgUQAtgKAlgdQAJgGAxguQAhgfAbgKQAmgOA0ALQAxALANAnQAMAggTAmQgSAmghANQglAOgjgcIANAYQAVAZArAAQAfAAAsgfQAughAqgFQAygGAFAoQAEAqg1ApQgSAOAAAUQgBASAPAPQAjAlA3gWQgSgCgRgHQghgOAIgZQAFgPAfgOQAegOAlgFQBggNAVAzQATAvgtAdQg2AjiFgJQjAgMhzgEQiugIheAEQkRAOjEAIQjbAIhqAAQhJAAgSgEg");
	this.shape.setTransform(86.9328,33.1412);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,173.9,66.3), null);


(lib.shadow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.302)").s().p("AmvBDQiygcAAgnQAAgmCygcQC0gcD7AAQD8AACzAcQCzAcAAAmQAAAnizAcQizAcj8AAQj7AAi0gcg");
	this.shape.setTransform(61,9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,122,19);


(lib.bunny_tail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DEEDED").s().p("AhSAvQgighAAgtQAAgaALgWQgLCJDohsIABAAIAAABQgUBTgNANQgjAhgwAAQgwAAgjghg");
	this.shape.setTransform(11.7,14.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhvgFQAJgRAPgPQAighAxAAQAvAAAjAhQAbAaAGAiQhnAwg3AAQhGAAAGhMgABvAaIABAQIAAAKIgBgag");
	this.shape_1.setTransform(12.2747,7.0827);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,23.5,22.5);


(lib.bunny_nose = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E06576").s().p("AhRAjQgjgVgBggQgBgUANgRQADBlDcgwQgIARgWAPQgiAYgxACIgFAAQguAAgjgVg");
	this.shape.setTransform(11.7593,10.0798);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF7387").s().p("AhxgLQAIgKAMgJQAjgYAygCQAwgCAkAWQAkAWACAfQAAANgFALQhHAQgwAAQhlAAgChEg");
	this.shape_1.setTransform(12.6014,5.6667);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,24,15.7);


(lib.bunny_foot2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DEEDED").s().p("Ag7AGQgPgRgOgVQB8BGA0hFIABACQgNAtgzANQgOAEgMAAQgiAAgYgbg");
	this.shape.setTransform(13.425,26.0153);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhDBfQgPgXgNgcIgCgFQgKgWgDgTQgEgXADgWQACgJACgJQAPgwA0gOQAygOAiAnQAhAoAWA6QAVA3gKAtIgBACIAAgBQgaAigrAAQgsAAg/gkg");
	this.shape_1.setTransform(11.355,13.1504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,22.7,29.4);


(lib.bunny_foot1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DEEDED").s().p("AhAAIQgOgbgJghQAhBGCOgGQgYApg1AAQg1AAgWgtg");
	this.shape.setTransform(9.975,24.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhaBAQgGgWgDgYQgGgfAGgbQAEgZAOgUQAbgrA2AAQA0AAAWAvQAVAuAHA9QAEAwgNAkQgDAJgFAKIgWAAQh7AAgehBg");
	this.shape_1.setTransform(10.2817,12.898);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,20.6,29.9);


(lib.bunny_eye2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhRBSQgigiABgwQgBgvAigiQAighAvgBQAwABAiAhQAhAiAAAvQAAAwghAiQgiAhgwABQgvgBgighg");
	this.shape.setTransform(3.9728,4.8373,0.3456,0.4154,-1.9514);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,8,9.6);


(lib.bunny_eye1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgaAjQgMgOgBgUQgBgSALgPQAMgOAQgBQAQgBAMAOQAMANABAVQABASgMAPQgLAPgQAAIgCAAQgOAAgMgNg");
	this.shape.setTransform(3.9969,4.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,8,9.6);


(lib.bunny_ear2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DEEDED").s().p("AC4AeQg3kCh8AFQhkAEjVC8IgGgIQD5jlBvgEQB8gFA2EDQAwDiArAPQgJAmgQAJQgFADgFAAQgtAAgzjzg");
	this.shape.setTransform(37.2125,44.6123);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AD3BdQg3kCh8AEQhuAFj5DkIAGAHIhAA5QAfh4Buh/IAFgEQD5kCCQAuQCLAtARFCQALDVgUBSQgqgQgwjig");
	this.shape_1.setTransform(34.9704,33.4558);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70,72);


(lib.bunny_ear1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DEEDED").s().p("AE8FzQgdhchhiHQhgiHkOjfQjqjDB5gFQANAxCNB1QEODgBbCrQBbCrAOBbIAAAGIgPgsg");
	this.shape.setTransform(33.1212,41.4875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AEaGBIgBgGQgNhahbisQhbirkOjgQiOh1gMgwQATgBAbADQDLAbCEB7QCEB7BBCgQBBCgAZBYQAZBZgqBpQgGALgEAAQgMAAgJg8g");
	this.shape_1.setTransform(38.0412,44.4591);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0.1,72,88.80000000000001);


(lib.bunny_body = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DEEDED").s().p("AhpHtQk8gFgdjGQgdjGAYiCQAJg4ATg5QA4iqCBh2QApglAtgdQjBCIgXEDQgXEBCOCKQCNCKDrAdQDrAdBtgXQiiAwjiAAQhlAAhTgNg");
	this.shape.setTransform(46.6615,61.1125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhAILQjrgdiOiKQiNiKAXkBQAXkCDAiJIAVgMQBPgvAwgSQAvgSBvgJQA8gCA8AOQB3AaBTA8QBBAwBKBiQCFCvAHEFQAECghDBfQgYAggfAYQgcAWgiAQQgwAWg4AQQgwALhKAAQhbAAiCgRg");
	this.shape_1.setTransform(65.3994,53.9849);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,121.8,111.7);


(lib.Group_8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path();
	this.instance.setTransform(100.2,42.45,1,1,0,0,0,87,33.1);
	this.instance.compositeOperation = "screen";

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B0C6CB").s().p("As2GLQilgJAChlQADhzCnADQBTACBTAYQgmgpAJg2QALhBBRggQBKgcBmAqQAxAVAjAaQg1gqgVhLQgWhPAYhMQAahUBMgyQBYg6CMAAQEKAAA5DIQAcBkgZBjIAOgbQASgiAZgZQBQhQBzAkQBtAjgIBcQgEAtgZAnIANgMQARgNASgIQA7gaAyAlQAsAfgOA1QgIAbgQAUQAtgeA1gFQAxgEAnATQAnASAMAhQAMAkgaAnQg2BTkpALQjCAHjWgVQhqgLkbADQjyADiEAHIh+ALQg5AFgsAAIgpgCg");
	this.shape.setTransform(98.5767,39.6583);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_8, new cjs.Rectangle(0,0,197.2,79.3), null);


(lib.Group_7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_0();
	this.instance.setTransform(57.1,35,1,1,0,0,0,51.1,27.4);
	this.instance.compositeOperation = "screen";

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DFE9EB").s().p("AlkFIQivgBgjhCQgQggAGgdQAGgaAWgQQAWgQAdACQAfACAcAYQgKgQgGgWQgKgrAZgaQAcgfAjATQASAKAMAQQgQgfgEglQgIhKA/geQBCghAyA/QAZAfALAlQgShPANhSQAbijCbgGQBSgEA2AsQAuAnATBEQAQA9gKBAQgKA/gfAjIAxgqQA6gkAtAWQAxAXAIA0QAIArgVAjIAegMQAkgMAegCQBigGAFBdQAFBRhgAMQghAEgzgDIhKgFQhMgEiQAEQilAFg/ALQh3AWhuAAIgJAAg");
	this.shape.setTransform(57.8824,32.8642);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_7, new cjs.Rectangle(0,0,115.8,65.7), null);


(lib.Group_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_1();
	this.instance.setTransform(54.8,25.65,1,1,0,0,0,47.6,20);
	this.instance.compositeOperation = "screen";

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B0C6CB").s().p("AnCDvQhagGABg8QAChGBbACQAtABAuAPQgVgaAFggQAGgnAsgUQApgRA3AaQAbANAUAPQgdgZgMgtQgMgwANguQAhh0CUAAQCRAAAfB5QAPA9gOA7IAIgQQAKgUANgQQAsgwA/AWQA8AVgFA3QgCAbgOAYIAbgUQAggQAcAWQAYATgIAhQgEAQgJAMQAzgnAyAbQAyAagdAyQgeAyiiAHQhqAEh1gNQg7gGiaABQiFAChHAFQiCAJgPAAIgCgBg");
	this.shape.setTransform(53.9711,23.9513);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_6, new cjs.Rectangle(0,0,108,47.9), null);


(lib.Group_5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_2();
	this.instance.setTransform(94.05,35.75,1,1,0,0,0,81.7,27.9);
	this.instance.compositeOperation = "screen";

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B0C6CB").s().p("AsEFOQiagJAChUQAChiCcADQBPABBNAVQgjgjAIgtQALg3BMgbQBGgYBfAkQAuARAhAWQgygjgUg/QgUhCAWhAQAZhIBIgqQBSgwCEAAQD5AAA1CoQAbBVgYBTIANgXQARgdAYgVQBLhDBsAfQBmAdgHBNQgDAmgYAhIAtgcQA3gWAvAfQAqAbgOAtQgHAWgPARQAqgaAygDQAugEAkAQQAlAPALAcQAMAegZAiQgzBGkWAJQi2AGjJgSQhkgJkKACQjiACh9AHIh2AJQg4ADgqAAIgkAAg");
	this.shape.setTransform(92.546,33.4391);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_5, new cjs.Rectangle(0,0,185.1,66.9), null);


(lib.Group_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_3();
	this.instance.setTransform(133.35,64.55,1,1,0,0,0,119.5,50.4);
	this.instance.compositeOperation = "screen";

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DFE9EB").s().p("AOpJUQh+gNgvgDQi2gMlNgEQmFgEiTAQQkmAhkLgLQmZgQhKh/Qgkg8ASg2QAQgyA1gcQA2gcBDAGQBJAHA+AuQgWgfgKgoQgUhRA8gwQBFg4BRAnQAoAUAaAeQgjg7gFhFQgKiLCVg1QCfg3BuB5QA3A9AXBHQgIglgEg5QgIhyAZhfQBOkwFuAAQDAAAB5BXQBpBMAlCBQAgB0geB4QgeB0hLBAIAigZQAqgdArgUQCLhBBnAsQBvAxAPBiQANBSg0A/IBHgTQBWgTBHgCQDmgFADCwQADCZjjAOQgYACgdAAQg9AAhRgHg");
	this.shape.setTransform(135.563,60.2806);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_4, new cjs.Rectangle(0,0,271.2,120.6), null);


(lib.ClipGroup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EhK/AqMMAAAhUXMCV/AAAMAAABUXg");
	mask.setTransform(532.225,269.975);

	// Layer_3
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(114.2,50.55,0.3738,0.3738);

	this.instance_1 = new lib.Blend();
	this.instance_1.setTransform(773.85,503.6,1,1,0,0,0,67.7,49.8);
	this.instance_1.alpha = 0.1484;
	this.instance_1.compositeOperation = "multiply";

	this.instance_2 = new lib.CachedBmp_2();
	this.instance_2.setTransform(52.25,196.75,0.3738,0.3738);

	this.instance_3 = new lib.Group_4();
	this.instance_3.setTransform(541.7,114.65,1,1,0,0,0,135.6,60.2);
	this.instance_3.compositeOperation = "screen";

	this.instance_4 = new lib.Group_5();
	this.instance_4.setTransform(668.6,114.85,1,1,0,0,0,92.5,33.5);
	this.instance_4.compositeOperation = "screen";

	this.instance_5 = new lib.Group_6();
	this.instance_5.setTransform(916.1,125.6,1,1,0,0,0,54,23.9);
	this.instance_5.compositeOperation = "screen";

	this.instance_6 = new lib.Group_7();
	this.instance_6.setTransform(117.45,103.25,1,1,0,0,0,57.9,32.9);
	this.instance_6.compositeOperation = "screen";

	this.instance_7 = new lib.Group_8();
	this.instance_7.setTransform(222.2,141.3,1,1,0,0,0,98.5,39.6);
	this.instance_7.compositeOperation = "screen";

	this.instance_8 = new lib.CachedBmp_1();
	this.instance_8.setTransform(52.15,0,0.3738,0.3738);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_4,this.instance_5,this.instance_6,this.instance_7,this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(52.2,0,959.9,540), null);


(lib.BunnyHop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.bunny_foot1("synched",0);
	this.instance.setTransform(65.9,146.05,1.1418,1.7522,0,78.905,80.7907,11.2,3);

	this.instance_1 = new lib.bunny_nose("synched",0);
	this.instance_1.setTransform(171.6,122.75,1.1344,1.1436,0,-12.0392,-4.7307,12,7.9);

	this.instance_2 = new lib.bunny_eye2("synched",0);
	this.instance_2.setTransform(172.55,106.6,1.1344,1.1436,0,-12.0392,-4.7307,4,4.8);

	this.instance_3 = new lib.bunny_eye1("synched",0);
	this.instance_3.setTransform(158,108.65,1.1344,1.1436,0,-12.0392,-4.7307,4,4.7);

	this.instance_4 = new lib.bunny_ear2("synched",0);
	this.instance_4.setTransform(133.15,71.7,1.4991,0.9697,0,76.018,-143.8953,1.9,49.2);

	this.instance_5 = new lib.bunny_ear1("synched",0);
	this.instance_5.setTransform(126.7,59,1.1344,1.1436,0,-57.8902,-50.5834,67.8,80.4);

	this.instance_6 = new lib.bunny_foot1("synched",0);
	this.instance_6.setTransform(135.4,160.35,1.1417,1.5735,0,43.6024,45.4895,10.2,15);

	this.instance_7 = new lib.bunny_foot2("synched",0);
	this.instance_7.setTransform(147.5,160.35,1.1417,1.4292,0,49.847,51.7363,11.3,14.6);

	this.instance_8 = new lib.bunny_body("synched",0);
	this.instance_8.setTransform(111.95,115.5,1.3512,0.9877,0,22.1423,6.3218,61.6,61.3);

	this.instance_9 = new lib.bunny_tail("synched",0);
	this.instance_9.setTransform(32.55,134.05,1.1343,1.1821,0,-20.3199,-3.9764,19.9,7.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9,p:{skewX:-20.3199,skewY:-3.9764,x:32.55,y:134.05,regX:19.9,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,regY:61.3,scaleX:1.3512,skewX:22.1423,skewY:6.3218,x:111.95,y:115.5,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:49.847,skewY:51.7363,x:147.5,y:160.35,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:43.6024,skewY:45.4895,x:135.4,y:160.35,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1344,skewX:-57.8902,skewY:-50.5834,x:126.7,y:59,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:76.018,skewY:-143.8953,x:133.15,y:71.7,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:-12.0392,skewY:-4.7307,x:158,y:108.65,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-12.0392,skewY:-4.7307,x:172.55,y:106.6,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0392,skewY:-4.7307,x:171.6,y:122.75,regX:12,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1418,skewX:78.905,skewY:80.7907,x:65.9,y:146.05,scaleY:1.7522}}]}).to({state:[{t:this.instance_9,p:{skewX:-20.843,skewY:-4.4987,x:154,y:131.3,regX:19.9,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.7,regY:61.2,scaleX:1.3513,skewX:21.616,skewY:5.7979,x:233.3,y:112.05,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.3,scaleY:1.4291,skewX:-40.7656,skewY:-38.8753,x:289.7,y:138.85,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-56.1785,skewY:-54.2911,x:275,y:145.35,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-65.1621,skewY:-57.853,x:247.3,y:55.5,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.499,skewX:62.0297,skewY:-157.8856,x:253.95,y:68.1,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-12.5639,skewY:-5.2544,x:279.2,y:104.75,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.6,skewX:-12.5639,skewY:-5.2544,x:293.5,y:102.55,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.5639,skewY:-5.2544,x:292.8,y:118.7,regX:12,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:78.3799,skewY:80.2666,x:182.55,y:148.25,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:251,y:135.35,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.8,regY:61.2,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:332.05,y:124.75,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:385.1,y:157.45,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:369.9,y:162.6,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:352.2,y:70.1,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:357.1,y:83.45,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:378.35,y:122.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-6.3426,skewY:0.965,x:392.85,y:122.05,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:390.55,y:137.9,regX:12.1,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:277.65,y:155.35,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:306.45,y:146.35,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.8,regY:61.3,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:386.85,y:161.05,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.2,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:423.65,y:190.4,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:408.45,y:187.9,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:422.85,y:115,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:423.55,y:129.3,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:431.7,y:173.1,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.1,regY:4.6,skewX:11.4039,skewY:18.7118,x:445.85,y:177,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:438.6,y:191.3,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:316.6,y:160,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:343.3,y:139.6,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:435.8,y:225.4,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:426.2,y:189.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-9.5427,skewY:-7.657,x:411,y:186.85,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:455.6,y:115.95,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:464.5,y:139.6,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:18.6327,skewY:25.9412,x:431.2,y:185.6,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:18.6327,skewY:25.9412,x:444.65,y:191.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:435.65,y:204.15,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:343.75,y:155.8,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:351.45,y:137.85,regX:19.7,regY:7.5,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:435,y:227.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:427.55,y:188.8,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:412.55,y:186.35,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:459.5,y:117.1,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:467.55,y:140.7,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.6,skewX:20.5832,skewY:27.8909,x:432.6,y:185.75,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:445.75,y:191.85,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:436.4,y:204.3,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:347.6,y:154.8,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:332.8,y:154.9,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,regY:91.5,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:435,y:225.75,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:420.2,y:189.3,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-18.56,skewY:-16.6725,x:404.95,y:189.7,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:437.9,y:112.7,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:450.4,y:134.75,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:424.35,y:180.55,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:438.85,y:183.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:430.95,y:196.5,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:337.85,y:169.15,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:314.8,y:187.6,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:60,regY:111.2,scaleX:1.1647,skewX:0,skewY:0,x:376.35,y:224.45,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:408.7,y:193.25,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:397.95,y:191.5,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:407.55,y:123.85,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:420.3,y:130.25,regY:49.2,regX:2.1,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:409.8,y:178.95,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.1,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:424.6,y:177.05,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:420.7,y:192.95,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:318.95,y:195.15,scaleY:1.6381}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:325.95,y:206.05,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,regY:111.2,scaleX:1.1343,skewX:0,skewY:0,x:380.3,y:227.15,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:421.5,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:409.55,y:213.35,scaleY:1.1343}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:398.7,y:120.3,regX:68,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:407.2,y:121.75,regY:49.2,regX:1.9,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:408.9,y:171,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:423.7,y:170.05,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:419.4,y:186.05,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:325.95,y:206.05,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,regY:111.2,scaleX:1.1343,skewX:0,skewY:0,x:380.3,y:227.15,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:421.5,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:409.55,y:213.35,scaleY:1.1343}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:398.7,y:120.3,regX:68,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:407.2,y:121.75,regY:49.2,regX:1.9,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:408.9,y:171,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:423.7,y:170.05,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:419.4,y:186.05,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},20).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:325.95,y:206.05,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,regY:111.2,scaleX:1.1343,skewX:0,skewY:0,x:380.3,y:227.15,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:421.5,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:409.55,y:213.35,scaleY:1.1343}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:398.7,y:120.3,regX:68,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:407.2,y:121.75,regY:49.2,regX:1.9,scaleY:1.1343}},{t:this.instance_3,p:{regY:5,skewX:0,skewY:0,x:408.9,y:171,regX:4,scaleX:1.1343,scaleY:0.1299,rotation:-4.9715}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:0,skewY:0,x:423.7,y:170.05,scaleX:1.1343,scaleY:0.13}},{t:this.instance_1,p:{skewX:0,skewY:0,x:419.4,y:186.05,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},27).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:325.95,y:206.05,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,regY:111.2,scaleX:1.1343,skewX:0,skewY:0,x:380.3,y:227.15,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:421.5,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:409.55,y:213.35,scaleY:1.1343}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:398.7,y:120.3,regX:68,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:407.2,y:121.75,regY:49.2,regX:1.9,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:408.9,y:171,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:423.7,y:170.05,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:419.4,y:186.05,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:323.2,y:206.05,regX:19.8,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,regY:111.2,scaleX:1.1343,skewX:-7.3082,skewY:0,x:380.3,y:227.15,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.2,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:419.55,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:407.75,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:384.9,y:120.3,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:393.55,y:121.7,regY:49.1,regX:1.7,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:401.7,y:171,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.2,regY:4.8,skewX:-7.3082,skewY:0,x:416.45,y:170.05,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:414,y:186.05,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},12).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:324.55,y:206.05,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,regY:61.4,scaleX:1.1957,skewX:11.1242,skewY:0,x:390.25,y:172.3,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.2,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:419.55,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:407.75,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:394,y:114.45,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:407.25,y:121.7,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:419.6,y:165.65,regX:3.9,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:433.45,y:160.85,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:435.75,y:176.7,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:386.75,y:197.8,regX:19.9,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,regY:61.4,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:455.65,y:154.05,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:503.9,y:184.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:24.1382,skewY:26.0267,x:492.6,y:188.55,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:450.65,y:95.8,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:460.95,y:105.65,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:496.8,y:132.25,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-31.5014,skewY:-24.1944,x:509.65,y:125.4,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:514.15,y:140.9,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:422.2,y:198.3,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:466.8,y:160.7,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.6,regY:61.3,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:539.35,y:123.6,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.2,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:600.55,y:136.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-69.6605,skewY:-67.7731,x:587.8,y:146.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:539.95,y:65.3,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:549.4,y:75.95,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:582.55,y:105.7,regX:4.2,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:595.95,y:100.25,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:598.95,y:116.05,regX:12.1,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:498.55,y:170.5,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:532.35,y:135.35,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.8,regY:61.2,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:613.4,y:124.75,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:666.4,y:157.45,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:651.25,y:162.5,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:633.5,y:70.1,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:638.45,y:83.45,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:659.65,y:122.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-6.3426,skewY:0.965,x:674.3,y:122.1,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:671.8,y:137.9,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:558.95,y:155.35,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:587.65,y:146.3,regX:19.7,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,regY:61.3,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:668.25,y:161.1,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:705.1,y:190.4,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:689.75,y:187.9,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:704.15,y:115,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:704.75,y:129.35,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:712.95,y:173.1,regX:3.8,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.1,regY:4.6,skewX:11.4039,skewY:18.7118,x:727.2,y:177,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:720,y:191.35,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:597.9,y:160,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:624.6,y:139.6,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:717.15,y:225.4,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:707.55,y:189.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-9.5427,skewY:-7.657,x:692.3,y:186.85,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:736.95,y:115.95,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:745.85,y:139.6,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:18.6327,skewY:25.9412,x:712.5,y:185.6,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:18.6327,skewY:25.9412,x:725.95,y:191.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:716.95,y:204.15,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:625.1,y:155.8,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:632.75,y:137.85,regX:19.7,regY:7.5,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:716.35,y:227.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:708.75,y:188.9,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:693.85,y:186.35,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:740.85,y:117.1,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:748.8,y:140.75,regY:49.2,regX:2,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.6,skewX:20.5832,skewY:27.8909,x:713.95,y:185.75,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:727.1,y:191.85,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:717.8,y:204.35,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:628.85,y:154.8,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:614.05,y:154.95,regX:19.6,regY:7.8,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,regY:91.5,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:716.3,y:225.75,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:701.5,y:189.3,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-18.56,skewY:-16.6725,x:686.25,y:189.7,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:719.2,y:112.7,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:731.7,y:134.75,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:705.7,y:180.55,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:720.15,y:183.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:712.25,y:196.5,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:619.2,y:169.15,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:596.15,y:187.6,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.9,regY:111.2,scaleX:1.1647,skewX:0,skewY:0,x:657.6,y:224.45,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:690,y:193.25,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:679.3,y:191.5,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:688.85,y:123.85,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:701.65,y:130.25,regY:49.2,regX:2.1,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:691.1,y:178.95,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:705.8,y:177.1,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:702.05,y:192.95,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:600.25,y:195.15,scaleY:1.6381}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:607.3,y:206.05,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,regY:111.2,scaleX:1.1343,skewX:0,skewY:0,x:661.6,y:227.15,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.4,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:702.95,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:690.9,y:213.35,scaleY:1.1343}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:680.05,y:120.3,regX:68,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:688.55,y:121.75,regY:49.2,regX:1.9,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:690.2,y:171,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:705,y:170.05,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:700.75,y:186.05,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:603.45,y:206.05,regX:19.9,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,regY:111.2,scaleX:1.1343,skewX:-7.3082,skewY:0,x:660.6,y:227.15,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:699.8,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:687.95,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:665.1,y:120.3,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:673.75,y:121.6,regY:49,regX:1.7,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:681.85,y:171,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.2,regY:4.8,skewX:-7.3082,skewY:0,x:696.6,y:170.05,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:694.15,y:186.05,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},18).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:604.7,y:206.05,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,regY:61.4,scaleX:1.1957,skewX:11.1242,skewY:0,x:670.4,y:172.3,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:699.8,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:687.95,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:674.25,y:114.45,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:687.5,y:121.7,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:699.85,y:165.6,regX:4,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:713.65,y:160.85,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:715.9,y:176.7,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:666.9,y:197.85,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,regY:61.4,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:735.8,y:154.05,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.4,regY:14.5,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:784.25,y:184.35,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:24.1382,skewY:26.0267,x:772.75,y:188.55,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.6,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:730.9,y:95.85,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:741.15,y:105.65,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:776.95,y:132.25,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-31.5014,skewY:-24.1944,x:789.85,y:125.5,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:794.35,y:140.9,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:702.35,y:198.3,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:747,y:160.7,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.7,regY:61.3,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:819.65,y:123.6,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.2,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:880.7,y:136.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3,skewX:-69.6605,skewY:-67.7731,x:867.9,y:146.25,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:820.2,y:65.35,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:829.55,y:75.95,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:862.6,y:105.8,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:876.1,y:100.3,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:879.05,y:116.1,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:778.75,y:170.6,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:812.5,y:135.35,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.8,regY:61.3,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:893.6,y:124.85,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:946.6,y:157.45,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-49.9574,skewY:-48.0683,x:931.3,y:162.5,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:913.7,y:70,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:918.6,y:83.45,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:939.85,y:122.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-6.3426,skewY:0.965,x:954.4,y:122.05,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:952.05,y:137.9,regX:12.1,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:839.2,y:155.35,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:867.95,y:146.35,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.8,regY:61.4,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:948.35,y:161.15,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.2,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:985.15,y:190.4,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:969.95,y:187.9,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:984.35,y:115,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:985.05,y:129.3,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:993.1,y:173.1,regX:3.8,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.1,regY:4.6,skewX:11.4039,skewY:18.7118,x:1007.35,y:177,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:1000.1,y:191.3,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:878.05,y:160.05,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:904.9,y:139.5,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:997.35,y:225.4,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:987.65,y:189.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-9.5427,skewY:-7.657,x:972.5,y:186.85,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:1017.2,y:116,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:1026,y:139.6,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:18.6327,skewY:25.9412,x:992.65,y:185.6,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:18.6327,skewY:25.9412,x:1006.15,y:191.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:997.2,y:204.2,regX:12.2,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:905.3,y:155.8,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:912.9,y:137.95,regX:19.7,regY:7.6,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:996.5,y:227.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:989.05,y:188.8,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:974,y:186.35,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:1021.05,y:117.1,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:1029.05,y:140.7,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.6,skewX:20.5832,skewY:27.8909,x:994.05,y:185.7,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:1007.25,y:191.85,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:997.95,y:204.3,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:909.1,y:154.8,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:894.2,y:154.95,regX:19.6,regY:7.8,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,regY:91.5,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:996.45,y:225.75,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:981.7,y:189.3,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-18.56,skewY:-16.6725,x:966.4,y:189.7,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:999.4,y:112.7,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:1011.75,y:134.75,regY:49.6,regX:1.9,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:985.8,y:180.55,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:1000.3,y:183.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:992.45,y:196.5,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:899.4,y:169.15,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:876.3,y:187.6,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.9,regY:111.2,scaleX:1.1647,skewX:0,skewY:0,x:937.8,y:224.45,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:970.3,y:193.2,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:959.45,y:191.5,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:969.05,y:123.85,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:981.8,y:130.25,regY:49.2,regX:2.1,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:971.3,y:178.95,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.1,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:986.1,y:177.05,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:982.25,y:192.95,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:880.45,y:195.15,scaleY:1.6381}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:887.5,y:206.05,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,regY:111.2,scaleX:1.1343,skewX:0,skewY:0,x:941.8,y:227.15,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:983.05,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:971.05,y:213.35,scaleY:1.1343}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:960.1,y:120.3,regX:67.9,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:968.65,y:121.75,regY:49.2,regX:1.8,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:970.4,y:171,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:985.2,y:170.05,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:980.95,y:186.05,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:882.45,y:206.05,regX:19.9,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,regY:111.2,scaleX:1.1343,skewX:-7.3082,skewY:0,x:939.6,y:227.15,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:978.85,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:966.95,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:944.1,y:120.3,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:952.9,y:121.65,regY:49.1,regX:1.8,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:960.95,y:171,regX:4.1,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-7.3082,skewY:0,x:975.5,y:170.05,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:973.2,y:186.05,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},20).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:883.9,y:206.05,regX:19.9,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,regY:61.4,scaleX:1.1957,skewX:11.1242,skewY:0,x:949.45,y:172.3,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:978.85,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:966.95,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:953.25,y:114.45,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:966.5,y:121.7,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:978.85,y:165.65,regX:3.9,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:992.8,y:160.8,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:994.9,y:176.7,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:945.95,y:197.85,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,regY:61.4,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:1014.9,y:154.05,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:1063.15,y:184.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:24.1382,skewY:26.0267,x:1051.85,y:188.55,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:1009.9,y:95.8,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:1020.15,y:105.65,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:1056,y:132.3,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-31.5014,skewY:-24.1944,x:1068.9,y:125.5,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:1073.45,y:140.9,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:981.4,y:198.3,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:1026.15,y:160.8,regX:19.9,regY:7.8,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.7,regY:61.3,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:1098.7,y:123.6,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.2,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:1159.8,y:136.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-69.6605,skewY:-67.7731,x:1147.05,y:146.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:1099.2,y:65.3,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:1108.55,y:75.95,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:1141.65,y:105.8,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:1155.2,y:100.25,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:1158.1,y:116.1,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:1057.75,y:170.5,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:1091.55,y:135.35,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.7,regY:61.3,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:1172.55,y:124.8,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:1225.7,y:157.45,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:1210.45,y:162.6,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:1192.7,y:70.1,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:1197.65,y:83.45,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:1218.9,y:122.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-6.3426,skewY:0.965,x:1233.4,y:122.05,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:1231.2,y:137.9,regX:12.2,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:1118.25,y:155.2,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:1147.05,y:146.35,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,regY:61.3,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:1227.5,y:161.1,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:1264.3,y:190.4,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:1249.05,y:187.9,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:1263.4,y:115,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:1264.05,y:129.3,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:1272.3,y:173.1,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:11.4039,skewY:18.7118,x:1286.4,y:176.95,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:1279.15,y:191.3,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:1157.15,y:160,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:1183.95,y:139.5,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.4,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:1276.45,y:225.3,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:1266.75,y:189.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-9.5427,skewY:-7.657,x:1251.5,y:186.85,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:1296.15,y:115.95,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:1305.15,y:139.6,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:18.6327,skewY:25.9412,x:1271.75,y:185.6,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:18.6327,skewY:25.9412,x:1285.2,y:191.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:1276.2,y:204.15,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:1184.2,y:155.85,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:1191.95,y:137.95,regX:19.7,regY:7.6,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:1275.5,y:227.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:1268.1,y:188.8,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:1253.05,y:186.35,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:1300.1,y:117.1,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:1308,y:140.75,regY:49.2,regX:2,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:20.5832,skewY:27.8909,x:1273.1,y:185.85,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:1286.35,y:191.85,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:1277,y:204.3,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.4,regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:1188.2,y:154.75,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:1173.3,y:154.9,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,regY:91.5,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:1275.55,y:225.75,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:1260.75,y:189.3,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-18.56,skewY:-16.6725,x:1245.45,y:189.7,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:1278.45,y:112.7,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:1290.95,y:134.75,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:1264.85,y:180.55,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:1279.4,y:183.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:1271.45,y:196.5,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:1178.45,y:169.15,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:1155.25,y:187.6,regX:19.6,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.9,regY:111.3,scaleX:1.1647,skewX:0,skewY:0,x:1216.9,y:224.55,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:1249.35,y:193.2,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:1238.6,y:191.45,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:1248.1,y:123.85,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:1260.75,y:130.2,regY:49.1,regX:2,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:1250.45,y:178.95,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:1265.05,y:177.1,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:1261.35,y:192.95,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:1159.5,y:195.15,scaleY:1.6381}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:1166.5,y:206.05,regX:19.8,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,regY:111.2,scaleX:1.1343,skewX:0,skewY:0,x:1220.9,y:227.15,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:1262.1,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:1250.15,y:213.35,scaleY:1.1343}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:1239.2,y:120.3,regX:67.9,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:1247.75,y:121.75,regY:49.2,regX:1.8,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:1249.45,y:171,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:1264.2,y:170.05,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:1259.9,y:186.05,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:1161.6,y:206.05,regX:19.9,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,regY:111.2,scaleX:1.1343,skewX:-7.3082,skewY:0,x:1218.65,y:227.15,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:1257.9,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:1246.05,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:1223.3,y:120.25,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:1231.85,y:121.6,regY:49,regX:1.7,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:1240,y:171,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.2,regY:4.8,skewX:-7.3082,skewY:0,x:1254.75,y:170.05,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:1252.4,y:186.05,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},2).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:1162.85,y:206.05,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,regY:61.4,scaleX:1.1957,skewX:11.1242,skewY:0,x:1228.55,y:172.3,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:1257.9,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:1246.05,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:1232.35,y:114.45,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:1245.6,y:121.7,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:1257.95,y:165.6,regX:4,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:1271.8,y:160.8,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:1274,y:176.7,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:1225.1,y:197.8,regX:19.9,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,regY:61.4,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:1293.95,y:154.05,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:1342.2,y:184.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:24.1382,skewY:26.0267,x:1330.85,y:188.55,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:1288.9,y:95.8,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:1299.25,y:105.65,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:1335,y:132.3,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-31.5014,skewY:-24.1944,x:1347.95,y:125.5,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:1352.45,y:140.9,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:1260.45,y:198.2,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:1305.2,y:160.8,regX:19.9,regY:7.8,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.7,regY:61.3,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:1377.8,y:123.6,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.2,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:1438.85,y:136.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-69.6605,skewY:-67.7731,x:1426.1,y:146.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:1378.35,y:65.25,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:1387.65,y:75.95,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:1420.75,y:105.8,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:1434.15,y:100.3,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:1437.15,y:116.1,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:1336.8,y:170.5,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:1370.6,y:135.35,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.7,regY:61.3,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:1451.6,y:124.8,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:1504.75,y:157.45,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:1489.55,y:162.5,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:1471.8,y:70.1,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:1476.75,y:83.45,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:1497.95,y:122.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-6.3426,skewY:0.965,x:1512.6,y:122.1,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:1510.15,y:137.9,regX:12.1,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:1397.35,y:155.2,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:1425.95,y:146.3,regX:19.7,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,regY:61.3,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:1506.55,y:161.1,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:1543.45,y:190.45,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:1528.1,y:187.9,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:1542.4,y:115,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:1543,y:129.35,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:1551.25,y:173.1,regX:3.8,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:11.4039,skewY:18.7118,x:1565.4,y:176.95,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:1558.2,y:191.3,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:1436.2,y:160,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:1463,y:139.5,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:1555.45,y:225.4,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:1545.8,y:189.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-9.5427,skewY:-7.657,x:1530.65,y:186.85,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:1575.25,y:115.95,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:1584.15,y:139.6,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.6,skewX:18.6327,skewY:25.9412,x:1550.75,y:185.5,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:18.6327,skewY:25.9412,x:1564.2,y:191.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:1555.25,y:204.15,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:1463.25,y:155.85,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:1471,y:137.95,regX:19.7,regY:7.6,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:1554.6,y:227.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:1547.15,y:188.8,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:1532.1,y:186.35,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:1579.2,y:117.1,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:1587.05,y:140.75,regY:49.2,regX:2,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:20.5832,skewY:27.8909,x:1552.15,y:185.85,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:1565.4,y:191.85,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:1556.1,y:204.3,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:1467.2,y:154.8,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:1452.3,y:154.95,regX:19.6,regY:7.8,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,regY:91.5,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:1554.55,y:225.75,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:1539.85,y:189.3,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-18.56,skewY:-16.6725,x:1524.55,y:189.7,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:1557.45,y:112.7,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:1569.95,y:134.75,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:1544,y:180.55,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:1558.4,y:183.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:1550.5,y:196.5,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:1457.5,y:169.15,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:1434.35,y:187.6,regX:19.6,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.8,regY:111.3,scaleX:1.1647,skewX:0,skewY:0,x:1495.85,y:224.5,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:1528.35,y:193.2,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:1517.55,y:191.5,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:1527.15,y:123.85,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:1539.85,y:130.15,regY:49.1,regX:2.1,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:1529.4,y:178.95,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:1544.1,y:177.1,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:1540.4,y:192.95,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:1438.55,y:195.15,scaleY:1.6381}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:1445.55,y:206.05,regX:19.8,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,regY:111.2,scaleX:1.1343,skewX:0,skewY:0,x:1500,y:227.15,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:1541.15,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:1529.15,y:213.35,scaleY:1.1343}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:1518.25,y:120.3,regX:67.9,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:1526.7,y:121.75,regY:49.2,regX:1.7,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:1528.5,y:171,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:1543.25,y:170.05,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:1538.95,y:186.05,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:1440.05,y:206.05,regX:19.9,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,regY:111.2,scaleX:1.1343,skewX:-7.3082,skewY:0,x:1497.2,y:227.15,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:1536.45,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:1524.55,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:1501.7,y:120.3,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:1510.5,y:121.65,regY:49.1,regX:1.8,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:1518.55,y:171,regX:4.1,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-7.3082,skewY:0,x:1533.1,y:170.05,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:1530.8,y:186.05,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},33).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:1441.5,y:206.05,regX:19.9,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,regY:61.4,scaleX:1.1957,skewX:11.1242,skewY:0,x:1507.05,y:172.3,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:1536.45,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:1524.55,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:1510.85,y:114.45,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:1524.1,y:121.7,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:1536.45,y:165.65,regX:3.9,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:1550.4,y:160.8,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:1552.5,y:176.7,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:1503.55,y:197.85,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,regY:61.4,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:1572.5,y:154.05,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:1620.75,y:184.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:24.1382,skewY:26.0267,x:1609.45,y:188.55,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:1567.5,y:95.8,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:1577.75,y:105.65,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:1613.6,y:132.3,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-31.5014,skewY:-24.1944,x:1626.5,y:125.5,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:1631.05,y:140.9,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:1539,y:198.3,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:1583.75,y:160.8,regX:19.9,regY:7.8,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.7,regY:61.3,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:1656.3,y:123.6,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.2,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:1717.4,y:136.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-69.6605,skewY:-67.7731,x:1704.65,y:146.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:1656.8,y:65.3,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:1666.15,y:75.95,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:1699.25,y:105.8,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:1712.8,y:100.25,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:1715.7,y:116.1,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:1615.35,y:170.5,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:1649.15,y:135.35,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.7,regY:61.3,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:1730.15,y:124.8,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:1783.3,y:157.45,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:1768.05,y:162.6,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:1750.3,y:70.1,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:1755.25,y:83.45,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:1776.5,y:122.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-6.3426,skewY:0.965,x:1791,y:122.05,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:1788.8,y:137.9,regX:12.2,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:1675.85,y:155.2,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:1704.65,y:146.35,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,regY:61.3,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:1785.1,y:161.1,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:1821.9,y:190.4,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:1806.65,y:187.9,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:1821,y:115,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:1821.65,y:129.3,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:1829.9,y:173.1,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:11.4039,skewY:18.7118,x:1844,y:176.95,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:1836.75,y:191.3,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:1714.75,y:160,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:1741.55,y:139.5,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.4,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:1834.05,y:225.3,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:1824.35,y:189.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-9.5427,skewY:-7.657,x:1809.1,y:186.85,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:1853.75,y:115.95,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:1862.75,y:139.6,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:18.6327,skewY:25.9412,x:1829.35,y:185.6,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:18.6327,skewY:25.9412,x:1842.8,y:191.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:1833.8,y:204.15,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:1741.8,y:155.85,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:1749.55,y:137.95,regX:19.7,regY:7.6,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:1833.1,y:227.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:1825.7,y:188.8,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:1810.65,y:186.35,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:1857.7,y:117.1,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:1865.6,y:140.75,regY:49.2,regX:2,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:20.5832,skewY:27.8909,x:1830.7,y:185.85,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:1843.95,y:191.85,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:1834.6,y:204.3,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.4,regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:1745.8,y:154.75,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:1730.9,y:154.9,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,regY:91.5,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:1833.15,y:225.75,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:1818.35,y:189.3,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-18.56,skewY:-16.6725,x:1803.05,y:189.7,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:1836.05,y:112.7,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:1848.55,y:134.75,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:1822.45,y:180.55,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:1837,y:183.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:1829.05,y:196.5,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:1736.05,y:169.15,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:1712.85,y:187.6,regX:19.6,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.9,regY:111.3,scaleX:1.1647,skewX:0,skewY:0,x:1774.5,y:224.55,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:1806.95,y:193.2,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:1796.2,y:191.45,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:1805.7,y:123.85,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:1818.35,y:130.2,regY:49.1,regX:2,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:1808.05,y:178.95,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:1822.65,y:177.1,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:1818.95,y:192.95,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:1717.1,y:195.15,scaleY:1.6381}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:1724.1,y:206.05,regX:19.8,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,regY:111.2,scaleX:1.1343,skewX:0,skewY:0,x:1778.5,y:227.15,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:1819.7,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:1807.75,y:213.35,scaleY:1.1343}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:1796.8,y:120.3,regX:67.9,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:1805.35,y:121.75,regY:49.2,regX:1.8,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:1807.05,y:171,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:1821.8,y:170.05,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:1817.5,y:186.05,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:1719.2,y:206.05,regX:19.9,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,regY:111.2,scaleX:1.1343,skewX:-7.3082,skewY:0,x:1776.25,y:227.15,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:1815.5,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:1803.65,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:1780.9,y:120.25,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:1789.45,y:121.6,regY:49,regX:1.7,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:1797.6,y:171,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.2,regY:4.8,skewX:-7.3082,skewY:0,x:1812.35,y:170.05,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:1810,y:186.05,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},2).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:1720.45,y:206.05,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,regY:61.4,scaleX:1.1957,skewX:11.1242,skewY:0,x:1786.15,y:172.3,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:1815.5,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:1803.65,y:213.35,scaleY:1.1436}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:1789.95,y:114.45,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:1803.2,y:121.7,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:1815.55,y:165.6,regX:4,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:1829.4,y:160.8,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:1831.6,y:176.7,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:1778.2,y:197.8,regX:19.9,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,regY:61.4,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:1851.55,y:154.05,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:1899.8,y:184.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:24.1382,skewY:26.0267,x:1888.45,y:188.55,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:1846.5,y:95.8,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:1856.85,y:105.65,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:1892.6,y:132.3,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-31.5014,skewY:-24.1944,x:1905.55,y:125.5,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:1910.05,y:140.9,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:1818.05,y:198.2,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:1862.8,y:160.8,regX:19.9,regY:7.8,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.7,regY:61.3,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:1935.4,y:123.6,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.2,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:1996.45,y:136.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-69.6605,skewY:-67.7731,x:1983.7,y:146.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:1935.95,y:65.25,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:1945.25,y:75.95,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:1978.35,y:105.8,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:1991.75,y:100.3,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:1994.75,y:116.1,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:1894.4,y:170.5,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:1928.2,y:135.35,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.7,regY:61.3,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:2009.2,y:124.8,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:2062.35,y:157.45,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:2047.15,y:162.5,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:2029.4,y:70.1,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:2034.35,y:83.45,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:2055.55,y:122.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-6.3426,skewY:0.965,x:2070.2,y:122.1,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:2067.75,y:137.9,regX:12.1,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:1954.95,y:155.2,scaleY:1.7522}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:1983.55,y:146.3,regX:19.7,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,regY:61.3,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:2064.15,y:161.1,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:2101.05,y:190.45,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:2085.7,y:187.9,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:2100,y:115,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:2100.6,y:129.35,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:2108.85,y:173.1,regX:3.8,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:11.4039,skewY:18.7118,x:2123,y:176.95,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:2115.8,y:191.3,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:1993.8,y:160,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:2020.6,y:139.5,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:2113.05,y:225.4,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:2103.4,y:189.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-9.5427,skewY:-7.657,x:2088.25,y:186.85,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:2132.85,y:115.95,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:2141.75,y:139.6,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.6,skewX:18.6327,skewY:25.9412,x:2108.35,y:185.5,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:18.6327,skewY:25.9412,x:2121.8,y:191.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:2112.85,y:204.15,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:2020.85,y:155.85,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:2028.6,y:137.95,regX:19.7,regY:7.6,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,regY:91.5,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:2112.2,y:227.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:2104.75,y:188.8,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:2089.7,y:186.35,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:2136.8,y:117.1,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:2144.65,y:140.75,regY:49.2,regX:2,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:20.5832,skewY:27.8909,x:2109.75,y:185.85,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:2123,y:191.85,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:2113.7,y:204.3,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.3,regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:2024.8,y:154.8,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:2009.9,y:154.95,regX:19.6,regY:7.8,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,regY:91.5,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:2112.15,y:225.75,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:2097.45,y:189.3,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-18.56,skewY:-16.6725,x:2082.15,y:189.7,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:2115.05,y:112.7,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:2127.55,y:134.75,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:2101.6,y:180.55,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:2116,y:183.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:2108.1,y:196.5,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:2015.1,y:169.15,scaleY:1.7523}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:1991.95,y:187.6,regX:19.6,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.8,regY:111.3,scaleX:1.1647,skewX:0,skewY:0,x:2053.45,y:224.5,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:2085.95,y:193.2,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:2075.15,y:191.5,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:2084.75,y:123.85,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:2097.45,y:130.15,regY:49.1,regX:2.1,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:2087,y:178.95,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:2101.7,y:177.1,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:2098,y:192.95,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regX:11.2,regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:1996.15,y:195.15,scaleY:1.6381}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:2003.15,y:206.05,regX:19.8,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,regY:111.2,scaleX:1.1343,skewX:0,skewY:0,x:2057.6,y:227.15,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:2098.75,y:212.1,scaleX:1.1343}},{t:this.instance,p:{regX:10.2,regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:2086.75,y:213.35,scaleY:1.1343}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:2075.85,y:120.3,regX:67.9,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:2084.3,y:121.75,regY:49.2,regX:1.7,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:2086.1,y:171,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:2100.85,y:170.05,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:2096.55,y:186.05,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).wait(19));

	// Layer_2
	this.instance_10 = new lib.shadow("synched",0);
	this.instance_10.setTransform(93.7,222.6,1.1343,1.1343,0,0,0,61.1,9.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(2).to({x:229.85},0).wait(2).to({x:320.6},0).wait(2).to({x:375.05},0).wait(30).to({startPosition:0},0).wait(45).to({regX:61,x:433.95},0).wait(2).to({x:525.85},0).wait(2).to({x:602.95},0).wait(2).to({regX:60.9,x:661.9},0).wait(32).to({regX:61,x:715.25},0).wait(2).to({regX:61.1,x:809.45},0).wait(2).to({regX:61,x:877.45},0).wait(2).to({regX:60.9,x:938.65},0).wait(34).to({regX:61,x:996.6},0).wait(2).to({x:1077.1},0).wait(2).to({x:1161.05},0).wait(2).to({x:1218.9},0).wait(16).to({x:1273.35},0).wait(2).to({x:1375.45},0).wait(2).to({regX:61.1,x:1434.5},0).wait(2).to({regX:61,x:1491.7},0).wait(47).to({x:1554.2},0).wait(2).to({x:1634.7},0).wait(2).to({x:1718.65},0).wait(2).to({x:1776.5},0).wait(16).to({x:1830.95},0).wait(2).to({x:1933.05},0).wait(2).to({regX:61.1,x:1992.1},0).wait(2).to({regX:61,x:2060.1},0).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.5,1.4,2260.9,232);


// stage content:
(lib.starter_HTML5Canvas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"FolkStreams",startFrame:0,endFrame:194,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("FolkStreams",0);
		this.InsertIntoSoundStreamData(soundInstance,0,194,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(300));

	// Folk_Streams
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AgxAAIBjAA");
	this.shape.setTransform(1064.5,489.5);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(194).to({_off:false},0).wait(106));

	// Bunny_Hop
	this.instance = new lib.BunnyHop("synched",0);
	this.instance.setTransform(914.15,534.5,1,1,0,0,0,1131.9,121.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},291).wait(9));

	// Background
	this.instance_1 = new lib.ClipGroup();
	this.instance_1.setTransform(604,369.15,1.3361,1.3376,0,0,0,505.3,276.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(300));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(423.7,358.9,1621,380.1);
// library properties:
lib.properties = {
	id: '729D579E48A4439685E101AA6D1EC419',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#999999",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_3.png", id:"CachedBmp_3"},
		{src:"images/CachedBmp_2.png", id:"CachedBmp_2"},
		{src:"images/CachedBmp_1.png", id:"CachedBmp_1"},
		{src:"images/starter_atlas_1.png", id:"starter_atlas_1"},
		{src:"sounds/FolkStreams.mp3", id:"FolkStreams"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['729D579E48A4439685E101AA6D1EC419'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;