package election.stats;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Person {
	String name;
	String dob;
	String photo;
	String history;
	String sex;
	ArrayList<Person> activeRelatives;

	public Person(String name, String dob, String photo, String history,
			String sex, ArrayList<Person> activeRelatives) {
		super();
		this.name = name;
		this.dob = dob;
		this.photo = photo;
		this.history = history;
		this.sex = sex;
		this.activeRelatives = activeRelatives;
	}

	public ArrayList<Person> getActiveRelatives() {
		return activeRelatives;
	}

	public void setActiveRelatives(ArrayList<Person> activeRelatives) {
		this.activeRelatives = activeRelatives;
	}

	public String getHistory() {
		return history;
	}

	public void setHistory(String history) {
		this.history = history;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}
}
