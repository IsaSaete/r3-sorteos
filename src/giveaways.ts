import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";
export const loginUser = (email: string, password: string): void => {
  const validateLogin = programData.users.find(
    (user) => user.email === email && user.password === password
  );
  if (!validateLogin) {
    console.log("Error: No existe un usuario con estos datos");
    process.exit();
  }
  if (validateLogin) {
    programData.userEmail = validateLogin.email;
    programData.isAdmin = validateLogin.isAdmin;
  }
  saveData();
  console.log("Usuario registrado con exito");
};

export const createGiveaway = (): void => {
  const giveawayData = askUserNewGiveawayData();
  programData.giveaways.push({
    name: giveawayData.giveawayName,
    socialNetwork: giveawayData.giveawaySocialNetwork,
    participants: [],
  });
  console.log(programData.giveaways);
  console.log("El sorteo se ha registrado con éxito");
  saveData();
};

export const listGiveaways = (): void => {
  if (programData.giveaways.length === 0) {
    console.log("Actualmente, no hay sorteos disponibles");
  } else {
    console.log(
      `\nÉstos son los ${programData.giveaways.length} sorteos disponibles:\n`
    );
    programData.giveaways.forEach((giveaway, index) =>
      console.log(
        `${index + 1}. Sorteo de un ${giveaway.name} en ${
          giveaway.socialNetwork
        }`
      )
    );
  }
};
