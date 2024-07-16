import { builder } from "./builder";
import "./scalars";
import "./types/User";
import "./types/Drone";
import "./types/DroneUser";

export const schema = builder.toSchema();
