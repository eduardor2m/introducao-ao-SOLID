/* eslint-disable prefer-destructuring */
import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.params;

      if (!user_id) {
        const user_id_header = request.headers.user_id;

        const users = this.listAllUsersUseCase.execute({
          user_id: user_id_header.toString(),
        });

        return response.status(200).json(users);
      }
      const users = this.listAllUsersUseCase.execute({ user_id });

      return response.status(200).json(users);
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }
}

export { ListAllUsersController };
