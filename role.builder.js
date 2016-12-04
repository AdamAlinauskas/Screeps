var creepHelper = require('creep.helper');

var roleBuilder = {
   run: function(creep) {
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length >0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
			else{
				//kill the creep if there are no more constuction sites.
				creep.suicide();
			}
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	},
    create: function(potentialEnergyStored){
		//TODO find way to check for structures without using creeps
		//only create builders if there are things to build.
	    
		var someCreep = Game.creeps[Object.getOwnPropertyNames(Game.creeps)[0]]

		if(Object.keys(Game.creeps).length >0 && someCreep.room.find(FIND_CONSTRUCTION_SITES).length >= 1){
	        var creeps = _.filter(Game.creeps,(creep)=>creep.memory.role === 'builder');
			
			if(creeps.length < 3){
				creepHelper.CreateWorkerCreep('builder',potentialEnergyStored);
			}
		}
    }   
};

module.exports = roleBuilder;