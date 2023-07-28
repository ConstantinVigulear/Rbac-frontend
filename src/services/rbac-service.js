export default class RbacService {

    _apiBase = '/rbac';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };

    getAllRoles = async () => {
        return await this.getResource(`/roles/`);
    }

    getAllUsers = async () => {
        return await this.getResource(`/users/`);
    };

    getUser = async (id) => {
        const person = await this.getResource(`/users/${id}/`);
        return this._transformPerson(person);
    };

    _manageUser = async (user, restMethod) => {
        const recordBodyParameters = {
            'name': user.name,
            'email': user.email,
            'salary': user.salary,
            'active': user.active,
            'roles': user.roles
        }

        const options = {
            method: restMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recordBodyParameters)
        }

        const response = await fetch(this._apiBase + '/users', options);
        return await response.json();
    }

    updateUser = async (user) => {
            this._manageUser(user, 'PUT').then(() => {
            });
    }

    addUser = async (user) => {
        this._manageUser(user, 'POST').then(() => {
        });
    }

    deleteUser = async (user) => {
        this._manageUser(user, 'DELETE').then(() => {
        });
    }

    _transformPerson = (user) => {
        return {
            name: user.name,
            email: user.email,
            salary: user.salary,
            active: user.active,
            roles: user.roles
        }
    }
}