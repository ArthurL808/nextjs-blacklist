-- CreateTable
CREATE TABLE "Defendant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" STRING NOT NULL,
    "last_name" STRING NOT NULL,
    "dob" STRING NOT NULL,
    "height" INT4 NOT NULL,
    "weight" INT4 NOT NULL,
    "gender" STRING NOT NULL,
    "race" STRING NOT NULL,
    "reason" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Defendant_pkey" PRIMARY KEY ("id")
);
