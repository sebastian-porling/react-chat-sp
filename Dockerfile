FROM ubuntu
COPY ./build/express-socket-chat-linux ./
EXPOSE 3000
CMD [ "./express-socket-chat-linux" ]
