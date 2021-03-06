-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "productId" INTEGER,
    "userId" INTEGER,
    FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Request" ("createdAt", "description", "id", "productId", "title", "updatedAt", "userId") SELECT "createdAt", "description", "id", "productId", "title", "updatedAt", "userId" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
