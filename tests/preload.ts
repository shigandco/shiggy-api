import { existsSync } from "fs";
import { SHIGGY_DIR } from "../src/constants";
import getShiggies from "../src/shiggyGetter";

if (!existsSync(SHIGGY_DIR)) await getShiggies();
