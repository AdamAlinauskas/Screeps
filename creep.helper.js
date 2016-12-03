var creepHelper = {
    CreateWorkerCreep: function(roleName, potentialEnergyStored){
         //TOUGHT = 10 X 0 = 0
        //Attack = 80 X 0 = 0
        //MOVE = 50 X 2 = 100
        //CARRY = 50 X 2 = 100
        //WORK = 100 X 2 = 200
        //TOTAL = 400
         
	   var creeps = _.filter(Game.creeps,(creep)=>creep.memory.role === roleName);

	    if(creeps.length < 4){
            var parts = [MOVE, CARRY, WORK];
            if(potentialEnergyStored >=400){
                parts = [MOVE,MOVE,CARRY,CARRY,WORK,WORK];
            }

	        Game.spawns.Spawn1.createCreep(parts,{role:roleName})
	    }
	
    }
}


module.exports = creepHelper;