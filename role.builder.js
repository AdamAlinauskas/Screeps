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
    create: function(game,potentialEnergyStored){
		//TOUGHT = 10 X 0 = 0
        //Attack = 80 X 0 = 0
        //MOVE = 50 X 2 = 100
        //CARRY = 50 X 2 = 100
        //WORK = 100 X 2 = 200
        //TOTAL = 400

        var creeps = _.filter(game.creeps,(creep)=>creep.memory.role === 'builder');
       //TODO find way to check for structures without using creeps
	   //only create builders if there are things to build.
	    
	   var someCreep = Game.creeps[Object.getOwnPropertyNames(Game.creeps)[0]]

		if(game.creeps.length >0 && someCreep.room.find(FIND_CONSTRUCTION_SITES).length >= 1)
			if(creeps.length < 3){
				   var parts = [MOVE, CARRY, WORK];
            if(potentialEnergyStored >=400){
                parts = [MOVE,MOVE,CARRY,CARRY,WORK,WORK];
            }
				game.spawns.Spawn1.createCreep(parts,{role:'builder'})
			}
    }
    
};

module.exports = roleBuilder;