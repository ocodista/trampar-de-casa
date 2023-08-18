FROM rabbitmq:3-management

RUN rabbitmq-plugins enable rabbitmq_management
RUN rabbitmqctl set_policy message_rate_limit "^email-composer$" '{"message-ttl":40, "max-length":25, "overflow":"reject-publish"}' --apply-to queues