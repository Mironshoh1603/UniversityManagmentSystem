CREATE TABLE school(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(60)
);




CREATE TABLE classRoom(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  roomNumber VARCHAR(60),
  school_id BIGINT REFERENCES school(id) NOT NULL
);


CREATE TABLE class(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(60),
  school_id BIGINT REFERENCES school(id) NOT NULL
);

CREATE TABLE subject(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(60),
  class_id BIGINT REFERENCES class(id) NOT NULL
);


CREATE TABLE teacher(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  fullName VARCHAR(100),
  degree VARCHAR(10)  NOT NULL CHECK(degree IN ('Oliy','1-toifa','2-toifa','3-toifa')),
  exprience INT,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(13) NOT NULL ChECK(length(password)>=8),
  subject_id BIGINT REFERENCES subject(id) NOT NULL
);
CREATE TABLE task(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(60),
  max_mark INT NOT NULL,
  subject_id BIGINT REFERENCES subject(id) NOT NULL
);




CREATE TABLE parents (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(60),
  username VARCHAR(20) NOT NULL,
   password VARCHAR(13) NOT NULL ChECK(length(password)>=8)
);

CREATE TABLE lesson_table(
  id BIGSERIAL NOT NULL PRIMARY  KEY,
  lesson_time varchar(10) NOT NULL CHECK(lesson_time IN ('8.30','9.50','11.20')),
  teacher_id BIGINT REFERENCES teacher(id) NOT NULL,
  classRoom_id BIGINT REFERENCES classRoom(id) NOT NULL
);

CREATE TABLE student(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  fullName VARCHAR(100) NOT NULL,
  course INT NOT NULL,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(13) NOT NULL ChECK(length(password)>=8),
  class_id BIGINT REFERENCES class(id) NOT NULL
);


CREATE TABLE mark(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  value INT NOT NULL,
  task_id BIGINT REFERENCES task(id) NOT NULL,
  student_id BIGINT REFERENCES student(id) NOT NULL
);

CREATE TABLE attendance(
  id BIGSERIAL NOT NULL PRIMARY KEY ,
  lesson_table_id BIGINT REFERENCES lesson_table(id) NOT NULL,
  has BOOLEAN NOT NULL
);

ALTER TABLE attendance ALTER COLUMN has SET DEFAULT TRUE; 

CREATE TABLE daily(
  id BIGSERIAL NOT NULL UNIQUE,
  lesson_table_id BIGINT  REFERENCES lesson_table(id) NOT NULL UNIQUE,
  student_id  BIGINT  REFERENCES student(id) NOT NULL
)