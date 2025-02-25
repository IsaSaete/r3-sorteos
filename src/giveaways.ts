import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway, User } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";
export const loginUser = (email: string, password: string): void => {
  const dataUser = programData.users.find(
    (user) => user.email === email && user.password === password
  );

  if (!dataUser) {
    console.log("\nError: No existe un usuario con estos datos.");
    process.exit();
  }
  programData.userEmail = dataUser.email;
  programData.isAdmin = dataUser.isAdmin;

  saveData();

  console.log(`\n¡Bienvenida/o a la aplicación de sorteos ${dataUser.name}!`);
};

export const createGiveaway = (): void => {
  const giveawayData = askUserNewGiveawayData();
  programData.giveaways.push({
    name: giveawayData.giveawayName,
    socialNetwork: giveawayData.giveawaySocialNetwork,
    participants: [],
  });

  console.log("\n¡El sorteo se ha registrado con éxito!");

  saveData();
};

export const listGiveaways = (): void => {
  if (programData.giveaways.length === 0) {
    console.log("\nActualmente, no hay sorteos disponibles.");
    return;
  }
  console.log(
    `\nÉstos son los ${programData.giveaways.length} sorteos disponibles:\n`
  );
  programData.giveaways.forEach((giveaway, index) =>
    console.log(
      `${index + 1}. Sorteo de un ${giveaway.name} en ${
        giveaway.socialNetwork
      }.`
    )
  );
};

export const deleteGiveaway = (giveawayDeleteNumber: number): void => {
  if (
    giveawayDeleteNumber < 0 ||
    giveawayDeleteNumber > programData.giveaways.length
  ) {
    console.log("¡Este sorteo no existe!");
    return;
  }

  programData.giveaways.splice(giveawayDeleteNumber - 1, 1);
  console.log("¡Sorteo eliminado con éxito!");

  saveData();
};

export const enterGiveaway = (giveawayNumber: number): void => {
  if (giveawayNumber < 0 || giveawayNumber > programData.giveaways.length) {
    console.log("¡Este sorteo no existe!");
    return;
  }

  const numberChoosedGiveaway = programData.giveaways[giveawayNumber - 1];
  const logedUser = programData.users.find(
    (user) => user.email === programData.userEmail
  );

  numberChoosedGiveaway.participants.push(logedUser!);

  saveData();

  console.log(
    `¡Te has inscrito con éxito al sorteo ${numberChoosedGiveaway.name}!`
  );
};

export const listUserGiveaways = (): void => {
  const userLoged = programData.userEmail;
  const allGiveaways = programData.giveaways;
  const userGiveaways = allGiveaways.filter((giveaways) =>
    giveaways.participants.some(
      (participant) => participant.email === userLoged
    )
  );

  if (userGiveaways.length === 0) {
    console.log("¡No estás inscrito en ningún sorteo!");
    return;
  }

  console.log(
    `\nEstas inscrito en los siguientes ${userGiveaways.length} sorteos:\n`
  );

  userGiveaways.forEach((userGiveaways, index) => {
    console.log(
      `${index + 1}. Sorteo de un ${userGiveaways.name} que se realiza en ${
        userGiveaways.socialNetwork
      }.`
    );
  });
};
