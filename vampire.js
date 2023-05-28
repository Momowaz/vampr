class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;

  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
    
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let steps = 0;
    let currentVampire = this;

    while (currentVampire.creator !== null) {
      currentVampire = currentVampire.creator;
      steps++;
    }
    return steps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampireA = this;
    let currentVampireB = vampire;
  
    // Traverse lineage of vampire A and store ancestors in a set
    const ancestorsA = new Set();
    while (currentVampireA !== null) {
      ancestorsA.add(currentVampireA);
      currentVampireA = currentVampireA.creator;
    }
  
    // Traverse lineage of vampire B and check if an ancestor is in the set
    while (currentVampireB !== null) {
      if (ancestorsA.has(currentVampireB)) {
        return currentVampireB;
      }
      currentVampireB = currentVampireB.creator;
    }
  
    // If no common ancestor found
    return null;
  }
  
}

module.exports = Vampire;

