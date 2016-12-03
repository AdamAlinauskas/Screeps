var roleUpgrader = new function(){
var me = this;
    /** @param {Creep} creep **/
    this.run = function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
            this.upgrade(creep);
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
	};
    
    this.upgrade = function(creep){
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
    }
	
	this.create = function(game){
	   var upgraders = _.filter(game.creeps,(creep)=>creep.memory.role === 'upgrader');
	   if(upgraders.length < 4){
	       game.spawns.Spawn1.createCreep([MOVE,CARRY,WORK],{role:'upgrader'})
	   }
	}
}();

module.exports = roleUpgrader;