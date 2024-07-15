import { builder } from "./builder";
import "./scalars";
import "./types/User";
import "./types/Drone";

export const schema = builder.toSchema();
