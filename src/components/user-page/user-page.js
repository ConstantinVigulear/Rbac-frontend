import React, {useEffect, useMemo, useState} from "react";
import './user-page.css'
import RbacService from "../../services/rbac-service";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const UserPage = () => {

    const navigate = useNavigate()
    const {userEmail} = useParams()
    const rbacService = useMemo(() => new RbacService(), [])
    const [name, setName] = useState("");
    const [tempName, setTempName] = useState("");
    const [email, setEmail] = useState("");
    const [tempEmail, setTempEmail] = useState("");
    const [salary, setSalary] = useState("");
    const [tempSalary, setTempSalary] = useState("");
    const [active, setActive] = useState(false);
    const [tempActive, setTempActive] = useState(false);
    const [roles, setRoles] = useState([]);
    const [tempRoles, setTempRoles] = useState([]);
    const [defaultRoles, setDefaultRoles] = useState([]);
    const buttonDisabled = name === tempName && email === tempEmail && salary === tempSalary && active === tempActive && JSON.stringify(roles) === JSON.stringify(tempRoles);

    useEffect(() => {
        let canceled = false;
        if (userEmail != null) {
            rbacService.getUser(userEmail)
                .then(data => {
                    !canceled && setName(data.name);
                    !canceled && setEmail(data.email);
                    !canceled && setSalary(data.salary);
                    !canceled && setActive(data.active);
                    !canceled && setRoles(data.roles);
                    !canceled && setTempName(data.name);
                    !canceled && setTempEmail(data.email);
                    !canceled && setTempSalary(data.salary);
                    !canceled && setTempActive(data.active);
                    !canceled && setTempRoles(data.roles);
                })
        }
        rbacService.getAllRoles().then(data => !canceled && setDefaultRoles(data));
        return () => canceled = true;
    }, [rbacService, userEmail]);

    const submitForm = (event) => {
        event.preventDefault();
        let user = {
            name: tempName,
            email: tempEmail,
            salary: tempSalary,
            active: tempActive,
            roles: tempRoles
        };

        if (userEmail != null) {
            rbacService.updateUser(user).then(() => {
            });
        } else {
            rbacService.addUser(user).then(() => {
            });
        }
        navigate('/', {replace: true});
    }

    const onCancel = () => {
        document.getElementById("nameInput").value = name;
        setTempName(name);
        document.getElementById("emailInput").value = email
        setTempEmail(email);
        document.getElementById("salaryInput").value = salary
        setTempSalary(salary);
        document.getElementById("activeCheckBox").value = active
        setTempActive(active);
        defaultRoles.map(({id}) => {
            document.getElementById(id).checked = roles.some(role => id === role.id);
            return ''
        });
        setTempRoles(roles);
    }

    const handleOnChange = (event) => {
        let eventValue = event.target.value;
        let eventName = event.target.name;
        let managedRole = defaultRoles.at(defaultRoles.findIndex((role) => role.id === event.target.id));

        switch (eventName) {
            case ('name'):
                setTempName(eventValue);
                break;
            case ('email'):
                setTempEmail(eventValue);
                break;
            case ('salary'):
                setTempSalary(eventValue);
                break;
            case ('active'):
                setTempActive(!tempActive);
                break;
            case ('roles'):
                if (tempRoles.some(role => role.id === managedRole.id)) {
                    let index = tempRoles.findIndex(role => role.id === managedRole.id);
                    setTempRoles([...tempRoles.slice(0, index), ...tempRoles.slice(index + 1)])
                } else
                    setTempRoles([...tempRoles, managedRole]);
                break;
            default:
                break;
        }
    }

    const isChecked = (roleId) => {
        return tempRoles.some(role => roleId === role.id);
    }

    return (
        <div className="rbac-userPage ">
            <form onSubmit={submitForm}>
                <h3>Name</h3>
                <input required
                       id="nameInput"
                       type="text"
                       name="name"
                       placeholder="John Smith"
                       defaultValue={tempName}
                       onChange={(event) => handleOnChange(event)}/>
                <br/><br/>
                <h3>Email</h3>
                <input readOnly={!!userEmail}
                       required
                       id="emailInput"
                       type="email"
                       name="email"
                       placeholder="john.smith@gmail.com"
                       defaultValue={tempEmail}
                       size="30"
                       onChange={(event) => handleOnChange(event)}
                />
                <br/><br/>
                <h3>Salary</h3>
                <input required
                       id="salaryInput"
                       type="number"
                       name="salary"
                       placeholder="0"
                       defaultValue={tempSalary}
                       onChange={(event) => handleOnChange(event)}/>
                <br/><br/>
                <label>
                    <h3 className="">Active</h3>
                </label>
                <input className="active-input"
                       id="activeCheckBox"
                       type="checkbox"
                       name="active"
                       checked={tempActive}
                       onChange={(event) => handleOnChange(event)}/>
                <br/>
                <h3>Roles</h3>
                <ul className="toppings-list">
                    {defaultRoles.map(({id}) => {
                        return (
                            <li key={id}>
                                <div className="toppings-list-item">
                                    <div className="left-section">
                                        <input
                                            type="checkbox"
                                            checked={isChecked(id)}
                                            id={id}
                                            name="roles"
                                            onChange={(event) => handleOnChange(event)}
                                        />
                                        <label>{id}</label>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <input className="btn btn-outline-success btn-sm float-right"
                       disabled={buttonDisabled}
                       type="submit"
                       value="Save"
                />
            </form>
            <input className="btn btn-outline-danger btn-sm float-right"
                   disabled={buttonDisabled}
                   type="submit"
                   value="Cancel"
                   onClick={() => onCancel()}
            />
            <input className="btn btn-outline-secondary btn-sm float-left"
                   type="submit"
                   value="Back"
                   onClick={() => {
                       navigate('/')
                   }}/>
        </div>
    )
}

export default UserPage;