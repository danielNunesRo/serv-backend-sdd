CREATE TYPE role_enum AS ENUM (
  'ADMINISTRADOR',
  'MODERADOR',
  'COMUM'
);

CREATE TABLE voluntarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  role role_enum NOT NULL DEFAULT 'COMUM',
  ativo BOOLEAN NOT NULL DEFAULT true,
  data_criacao TIMESTAMP NOT NULL DEFAULT NOW()
);
           
 CREATE TABLE voluntarios_auditoria (
  id SERIAL PRIMARY KEY,
  conta_email VARCHAR(150) NOT NULL,
  role_antiga role_enum NOT NULL,
  role_atualizada role_enum NOT NULL,
  atualizada_por_email VARCHAR(150) NOT NULL,  
  data_atualizacao TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TYPE feedback_status AS ENUM (
  'OPEN',
  'ANSWERED',
  'CLOSED'
);

CREATE TABLE feedbacks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  admin_id INTEGER NOT NULL,
  title VARCHAR(150) NOT NULL,
  status feedback_status NOT NULL DEFAULT 'OPEN',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  closed_at TIMESTAMP,

  CONSTRAINT fk_feedback_user
    FOREIGN KEY (user_id) REFERENCES voluntarios(id),

  CONSTRAINT fk_feedback_admin
    FOREIGN KEY (admin_id) REFERENCES voluntarios(id)
);

CREATE TYPE feedback_author_type AS ENUM (
  'ADMIN',
  'USER'
);

CREATE TABLE feedback_messages (
  id SERIAL PRIMARY KEY,
  feedback_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  author_type role_enum NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_message_feedback
    FOREIGN KEY (feedback_id) REFERENCES feedbacks(id)
      ON DELETE CASCADE,

  CONSTRAINT fk_message_author
    FOREIGN KEY (author_id) REFERENCES voluntarios(id)
);

CREATE INDEX idx_feedbacks_user_id
  ON feedbacks(user_id);

CREATE INDEX idx_feedbacks_status
  ON feedbacks(status);

CREATE INDEX idx_feedback_messages_feedback_id
  ON feedback_messages(feedback_id);

CREATE INDEX idx_feedback_messages_created_at
  ON feedback_messages(created_at);
  
 CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  created_by INTEGER NOT NULL,
  title VARCHAR(150) NOT NULL,
  description VARCHAR(300),
  date_event DATE not null,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_created_voluntarios
  FOREIGN KEY (created_by) REFERENCES voluntarios(id)
);

CREATE TABLE medias_voluntarios (
  id SERIAL PRIMARY KEY,

  voluntario_id INTEGER NOT NULL,
  media NUMERIC(5,2) NOT NULL,
  data_media DATE NOT NULL,

  created_by INTEGER NOT NULL,

  data_criacao TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_medias_voluntario
    FOREIGN KEY (voluntario_id)
    REFERENCES voluntarios(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_medias_created_by
    FOREIGN KEY (created_by)
    REFERENCES voluntarios(id)
);

INSERT INTO voluntarios (nome, email, senha, role)
VALUES (
  'Administrador',
  'ADM',
  'adm@123',
  'ADMINISTRADOR'
);

